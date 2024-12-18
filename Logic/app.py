from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from dotenv import load_dotenv
from flask_mysqldb import MySQL
import os
import bcrypt
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from werkzeug.utils import secure_filename


app = Flask(__name__)

# Load environment variables
load_dotenv(dotenv_path=".env")

# Enable CORS
CORS(app, supports_credentials=True)
# Configure Flask-MySQLdb connection
app.config['MYSQL_HOST'] = os.getenv('MySQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MySQL_DATABASE_USERNAME')
app.config['MYSQL_PASSWORD'] = os.getenv('MySQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DATABASE')



mysql = MySQL(app)

@app.route('/Signup', methods=['POST'])
def signup():
    print("Signup API has been hit! good luck!")
    try:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        
        unencryptedpass= password
        # Make sure passwords match
        confirm_password = data.get("confirmPassword")
        if password != confirm_password:
            return jsonify({"message": "Passwords do not match."}), 400

        # Add your logic to check if user already exists in the DB
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM signup WHERE email = %s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"message": "User already exists."}), 400

        # Insert new user into the database
        cursor.execute(
            "INSERT INTO signup (username, email, password) VALUES (%s, %s, %s)",
            (username, email, bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())),
        )
        mysql.connection.commit()
        cursor.close()
        
        return jsonify({"message": "User created successfully."}), 201

    except Exception as e:
        print(f"Error occurred: {e}")  # Log error to the console or file
        return jsonify({"message": "Failed to create user"}), 500
    

@app.route('/Login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(username,"tryna hit endpoint")
    if not username or not password:
        return jsonify({"message": "Username and password are required!"}), 400

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT password FROM signup WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user:
        stored_password = user[0]
        if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
            print("Successfully stored password")
            response = jsonify({"message": "Login successful!"})
            response.set_cookie(
                'username',
                username,
                httponly=True,
                samesite='Strict',  # Use 'Strict' to limit it to same-site requests
                secure=False  # Set to True in production with HTTPS
            )
            return response, 200
        else:
            print("OOhps")
            return jsonify({"message": "Invalid Credentials!"}), 401
    else:
        return jsonify({"message": "Invalid Credentials!"}), 404




@app.route('/ForgotPassword', methods=['POST'])
def forgot_password():
    username = request.json.get("username")

    if not username:
        return jsonify({"message": "Username is required!"}), 400

    try:
        # Fetch user details from the database
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT email, password FROM signup WHERE username = %s", (username,))
        user = cursor.fetchone()
        cursor.close()

        if not user:
            return jsonify({"message": "User not found!"}), 404

        email = user[0]
        password = user[1]  # Ensure this is hashed when stored

        # Set up email details
        sender_email = os.getenv("SOLVITEMAIL")
        app_password = os.getenv("SOLVITPASSWORD")  # App password from 2FA
        receiver_email = email

        if not sender_email or not app_password:
            return jsonify({"message": "Email configuration missing. Please check environment variables."}), 500

        # Create the email message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = 'Your Password Reset'

        body = (
            f"Hello {username},\n\n"
            f"We received a request to reset your password. Your current encrypted password is:\n\n"
            f"{password}\n\n"
            "If you did not request this reset, please contact support.\n\n"
            "Regards,\nSolvIt Solutions 4U"
        )
        msg.attach(MIMEText(body, 'plain'))

        # Send the email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, app_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()

        return jsonify({"message": "Password reset email sent successfully."}), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

@app.route('/AddBreedForm', methods=['POST', 'GET'])
def add_or_get_breeds():
    if request.method == 'POST':
        print("Post breed")
        """
        Endpoint to add a new breed to the database.
        Prevents duplicate breed names.
        """
        try:
            # Get data from the request
            data = request.get_json()
            breed_name = data.get("breedName")
            breed_code = data.get("breedCode")
            breed_origin = data.get("breedOrigin")
            breed_group = data.get("breedGroup")
            coat_type = data.get("coatType")
            life_expectancy = data.get("lifeExpectancy")
            average_weight = data.get("averageWeight")
            average_height = data.get("averageHeight")
            temperament = data.get("temperament")
            grooming_needs = data.get("groomingNeeds")
            energy_level = data.get("energyLevel")

            # Validate required fields
            if not breed_name or not breed_code:
                return jsonify({"message": "Breed name and code are required."}), 400

            # Check for duplicate breed name
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM breed WHERE breed_name = %s", (breed_name,))
            existing_breed = cursor.fetchone()
            if existing_breed:
                return jsonify({"message": f"Breed '{breed_name}' already exists."}), 409

            # Insert new breed into the database
            cursor.execute(
                """
                INSERT INTO breed (
                    breed_name, breed_code, breed_origin, breed_group, coat_type,
                    life_expectancy, average_weight, average_height, temperament,
                    grooming_needs, energy_level
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    breed_name, breed_code, breed_origin, breed_group, coat_type,
                    life_expectancy, average_weight, average_height, temperament,
                    grooming_needs, energy_level
                ),
            )
            mysql.connection.commit()
            cursor.close()

            return jsonify({"message": f"Breed '{breed_name}' added successfully!"}), 201

        except Exception as e:
            print(f"Error occurred: {e}")
            return jsonify({"message": "Failed to add breed.", "error": str(e)}), 500

    elif request.method == 'GET':
        print("Get breeds")
        """
        Endpoint to retrieve all breeds from the database.
        Assigns a sequential number to each record.
        """
        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM breed")
            rows = cursor.fetchall()

            breeds = []
            for idx, row in enumerate(rows, start=1):
                breeds.append({
                    "number": idx,
                    "id": row[0],
                    "breedName": row[1],
                    "breedCode": row[2],
                    "breedOrigin": row[3],
                    "breedGroup": row[4],
                    "coatType": row[5],
                    "lifeExpectancy": row[6],
                    "averageWeight": row[7],
                    "averageHeight": row[8],
                    "temperament": row[9],
                    "groomingNeeds": row[10],
                    "energyLevel": row[11],
                    "createdAt": row[12],
                })
            cursor.close()

            return jsonify(breeds), 200

        except Exception as e:
            print(f"Error occurred: {e}")
            return jsonify({"message": "Failed to retrieve breeds.", "error": str(e)}), 500


@app.route('/DeleteBreedForm/<int:breed_id>', methods=['DELETE'])
def delete_breed(breed_id):
    """
    Endpoint to delete a breed by ID.
    """
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM breed WHERE id = %s", (breed_id,))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": f"Breed with ID {breed_id} deleted successfully."}), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"message": "Failed to delete breed.", "error": str(e)}), 500


@app.route('/EditBreedForm/<int:breed_id>', methods=['PUT'])
def edit_breed(breed_id):
    """
    Endpoint to edit a breed by ID.
    """
    try:
        data = request.get_json()
        breed_name = data.get("breedName")
        breed_code = data.get("breedCode")
        breed_origin = data.get("breedOrigin")
        breed_group = data.get("breedGroup")
        coat_type = data.get("coatType")
        life_expectancy = data.get("lifeExpectancy")
        average_weight = data.get("averageWeight")
        average_height = data.get("averageHeight")
        temperament = data.get("temperament")
        grooming_needs = data.get("groomingNeeds")
        energy_level = data.get("energyLevel")

        if not breed_name or not breed_code:
            return jsonify({"message": "Breed name and code are required."}), 400

        cursor = mysql.connection.cursor()
        cursor.execute(
            """
            UPDATE breed
            SET breed_name = %s, breed_code = %s, breed_origin = %s, breed_group = %s,
                coat_type = %s, life_expectancy = %s, average_weight = %s, average_height = %s,
                temperament = %s, grooming_needs = %s, energy_level = %s
            WHERE id = %s
            """,
            (
                breed_name, breed_code, breed_origin, breed_group, coat_type,
                life_expectancy, average_weight, average_height, temperament,
                grooming_needs, energy_level, breed_id
            ),
        )
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": f"Breed with ID {breed_id} updated successfully."}), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"message": "Failed to update breed.", "error": str(e)}),


@app.route("/AddTax", methods=["GET", "POST"])
def add_tax():
    if request.method == "POST":
        print("You have hit the endpoint for tax add")
        data = request.get_json()

        # Extract data from the request
        tax_type = data.get("taxType")
        tax_rate = data.get("taxRate")
        upper_limit = data.get("upperLimit")
        lower_limit = data.get("lowerLimit")

        # Validate input
        if not all([tax_type, tax_rate, upper_limit, lower_limit]):
            return jsonify({"message": "All fields are required."}), 400

        # Check if the tax_type already exists
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM tax WHERE tax_type = %s", (tax_type,))
        existing_tax = cursor.fetchone()
        
        if existing_tax:
            return jsonify({"message": f"Tax type '{tax_type}' already exists."}), 409
        
        # Insert new tax into the database
        cursor.execute(
            """
            INSERT INTO tax (tax_type, tax_rate, upper_limit, lower_limit)
            VALUES (%s, %s, %s, %s)
            """,
            (tax_type, tax_rate, upper_limit, lower_limit),
        )
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Tax type added successfully."}), 201

    elif request.method == "GET":
        print("Fetching tax types")
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM tax")
        tax_types = cursor.fetchall()
        
        # Convert to JSON-compatible format
        result = [{"_id": item[0], "taxType": item[1], "taxRate": item[2], "upperLimit": item[3], "lowerLimit": item[4]} for item in tax_types]
        
        cursor.close()
        return jsonify({"success": True, "data": result}), 200
    

@app.route("/EditTax/<string:tax_id>", methods=["PUT"])
def edit_tax(tax_id):
    if request.method == "PUT":
        print("You have hit the endpoint to edit tax")
        data = request.get_json()

        # Extract data from the request
        tax_type = data.get("taxType")
        tax_rate = data.get("taxRate")
        upper_limit = data.get("upperLimit")
        lower_limit = data.get("lowerLimit")

        # Validate input
        if not all([tax_type, tax_rate, upper_limit, lower_limit]):
            return jsonify({"message": "All fields are required."}), 400

        # Check if the tax ID exists
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM tax WHERE id = %s", (tax_id,))
        existing_tax = cursor.fetchone()
        
        if not existing_tax:
            return jsonify({"message": f"Tax with ID '{tax_id}' does not exist."}), 404

        # Check for duplicate tax_type excluding the current one
        cursor.execute(
            "SELECT * FROM tax WHERE tax_type = %s AND id != %s", (tax_type, tax_id)
        )
        duplicate_tax = cursor.fetchone()
        
        if duplicate_tax:
            return jsonify({"message": f"Tax type '{tax_type}' already exists."}), 409

        # Update the tax in the database
        cursor.execute(
            """
            UPDATE tax
            SET tax_type = %s, tax_rate = %s, upper_limit = %s, lower_limit = %s
            WHERE id = %s
            """,
            (tax_type, tax_rate, upper_limit, lower_limit, tax_id),
        )
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Tax type updated successfully."}), 200



@app.route("/DeleteTax/<int:id>", methods=['DELETE'])
def delete_tax(id):
    try:
        print(f"Received ID for deletion: {id}")  # Debugging log
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM tax WHERE id = %s", (id,))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": f"Tax type with ID {id} deleted successfully."}), 200
    except Exception as e:
        print(f"Error deleting tax type: {e}")
        return jsonify({"error": "Failed to delete tax type."}), 500


@app.route("/Addunitofmeasure", methods=['POST', 'GET'])
def unitofmeasurement():
    if request.method == 'POST':
        print("unit of measure")
        data = request.get_json()
        print(data)

        name = data.get('name')
        abbreviation = data.get('abbreviation')
        decimalplace = data.get('decimalPlace')
        unit_type = data.get('unitType')
        description = data.get('description')
        
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM unitofmeasure WHERE Name = %s", (name,))
        existing_name = cursor.fetchone()

        if existing_name:
            return jsonify({"error": "Unit of Measure with this name already exists"}), 409
        
        cursor.execute(
            "INSERT INTO unitofmeasure (Name, Abbreviation, DecimalPlace, UnitType, Description) VALUES (%s, %s, %s, %s, %s)",
            (name, abbreviation, decimalplace, unit_type, description)
        )
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": "Unit of Measure added successfully!"}), 201

    elif request.method == "GET":  
        print("Fetching unit of measures")
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM unitofmeasure")
        unit_of_measures = cursor.fetchall()
        cursor.close()

        # Convert rows to a list of dictionaries
        units = []
        for row in unit_of_measures:
            units.append({
                'id': row[0],  # Adjust according to your database schema
                'name': row[1],
                'abbreviation': row[2],
                'decimalPlace': row[3],
                'unitType': row[4],
                'description': row[5]
            })

        return jsonify({"unit_of_measures": units}), 200

@app.route("/DeleteMeasure/<int:id>", methods=["DELETE"])

def delete_measure(id):
    try:
        print(f"Received ID for deletion: {id}")  # Debugging log
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM unitofmeasure WHERE UnitID = %s", (id,))
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": f"Unit of Measure with ID {id} deleted successfully."}), 200
    except Exception as e:
        print(f"Error deleting unit of measure: {e}")
        return jsonify({"error": "Failed to delete unit of measure."}), 500



@app.route("/GetMeasureById/<int:id>", methods=["GET"])
def get_measure_by_id(id):
    try:
        print(f"Received ID: {id}")  # Debugging log

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM unitofmeasure WHERE UnitID = %s", (id,))
        unit_of_measure = cursor.fetchone()
        cursor.close()

        if unit_of_measure:
            # Convert row to a dictionary
            unit = {
                'id': unit_of_measure[0],  # Adjust according to your database schema
                'name': unit_of_measure[1],
                'abbreviation': unit_of_measure[2],
                'decimalPlace': unit_of_measure[3],
                'unitType': unit_of_measure[4],
                'description': unit_of_measure[5]
            }
            return jsonify({"unit_of_measure": unit}), 200
        else:
            return jsonify({"error": "Unit of measure not found."}), 404

    except Exception as e:
        print(f"Error getting unit of measure by ID: {e}")
        return jsonify({"error": "Failed to get unit of measure by ID."}), 500




import logging
# Route for adding a purchase account
@app.route("/AddPurchaseAccount", methods=["POST"])
def add_purchase_account():
    cursor = mysql.connection.cursor()
    data = request.get_json()

    account_name = data.get('accountName')
    account_description = data.get('accountDescription')
    bank_name = data.get('bankName')
    account_number = data.get('accountNumber')
    bank_address = data.get('bankAddress')
    currency = data.get('currency')
    payment_terms = data.get('paymentTerms')
    preferred_vendors = data.get('preferredVendors')
    procurement_limits = data.get('procurementLimits')
    associated_business_unit = data.get('associatedBusinessUnit')
    account_manager = data.get('accountManager')
    status = data.get('status', 'active')  # Default to 'active' if not provided

    # Convert reimbursementEligibility to boolean
    reimbursement_eligibility = data.get('reimbursementEligibility', False)
    if isinstance(reimbursement_eligibility, str):
        reimbursement_eligibility = reimbursement_eligibility.lower() in ['true', '1', 'on']

    try:
        # Check for existing account
        cursor.execute("SELECT * FROM purchaseAccounts WHERE accountName = %s", (account_name,))
        existing_account = cursor.fetchone()

        if existing_account:
            return jsonify({"error": "Purchase account with this name already exists"}), 409

        # Insert new account
        cursor.execute("""
            INSERT INTO purchaseAccounts (
                accountName, accountDescription, bankName, accountNumber, 
                bankAddress, currency, paymentTerms, preferredVendors, 
                procurementLimits, associatedBusinessUnit, accountManager, 
                status, reimbursementEligibility
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (account_name, account_description, bank_name, account_number, bank_address, currency, 
              payment_terms, preferred_vendors, procurement_limits, associated_business_unit, 
              account_manager, status, reimbursement_eligibility))

        mysql.connection.commit()
        return jsonify({"message": "Purchase account added successfully!"}), 201

    except mysql.connection.Error as err:
        logging.error(f"Database error: {str(err)}")
        return jsonify({"error": f"Database error: {str(err)}"}), 500

    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

    finally:
        cursor.close()


# Route for fetching purchase accounts
@app.route("/FetchPurchaseAccount", methods=["GET"])
def fetch_purchase_account():
    logging.debug("Fetching purchase accounts")
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("SELECT * FROM purchaseaccounts")
        accounts = cursor.fetchall()

        # Convert rows to a list of dictionaries
        accounts_list = []
        for account in accounts:
            accounts_list.append({
                'id': account[0],
                'accountName': account[1],
                'accountDescription': account[2],
                'bankName': account[3],
                'accountNumber': account[4],
                'bankAddress': account[5],
                'currency': account[6],
                'paymentTerms': account[7],
                'preferredVendors': account[8],
                'procurementLimits': account[9],
                'associatedBusinessUnit': account[10],
                'accountManager': account[11],
                'status': account[12],
                'reimbursementEligibility': account[13]
            })

        # Log instead of print
        logging.debug(f"Accounts: {accounts_list}")
        return jsonify(accounts_list), 200

    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

    finally:
        cursor.close()

@app.route("/DeletePurchaseAccount/<int:id>",methods=["DELETE"])

def delete_purchase_account(id):
    try:
        logging.debug(f"Received ID for deletion: {id}")  # Debugging log
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM purchaseaccounts WHERE id = %s", (id,))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": f"Purchase account with ID {id} deleted successfully."}), 200

    except Exception as e:
        logging.error(f"Error deleting purchase account: {e}")
        return jsonify({"error": "Failed to delete purchase account."}), 500



@app.route("/UpdatePurchaseAccount/<int:id>", methods=["PUT"])
def update_purchase_account(id):
    cursor = mysql.connection.cursor()
    data = request.get_json()

    account_name = data.get('accountName')
    account_description = data.get('accountDescription')
    bank_name = data.get('bankName')
    account_number = data.get('accountNumber')
    bank_address = data.get('bankAddress')
    currency = data.get('currency')
    payment_terms = data.get('paymentTerms')
    preferred_vendors = data.get('preferredVendors')
    procurement_limits = data.get('procurementLimits')
    associated_business_unit = data.get('associatedBusinessUnit')
    account_manager = data.get('accountManager')
    status = data.get('status', 'active')  # Default to 'active' if not provided

    # Convert reimbursementEligibility to boolean
    reimbursement_eligibility = data.get('reimbursementEligibility', False)
    if isinstance(reimbursement_eligibility, str):
        reimbursement_eligibility = reimbursement_eligibility.lower() in ['true', '1', 'on']

    try:
        # Check if the account exists
        cursor.execute("SELECT * FROM purchaseAccounts WHERE id = %s", (id,))
        existing_account = cursor.fetchone()

        if not existing_account:
            return jsonify({"error": f"Purchase account with ID {id} not found"}), 404

        # Update the existing account with new values
        cursor.execute("""
            UPDATE purchaseAccounts 
            SET 
                accountName = %s,
                accountDescription = %s,
                bankName = %s,
                accountNumber = %s,
                bankAddress = %s,
                currency = %s,
                paymentTerms = %s,
                preferredVendors = %s,
                procurementLimits = %s,
                associatedBusinessUnit = %s,
                accountManager = %s,
                status = %s,
                reimbursementEligibility = %s
            WHERE id = %s
        """, (account_name, account_description, bank_name, account_number, bank_address, currency,
              payment_terms, preferred_vendors, procurement_limits, associated_business_unit,
              account_manager, status, reimbursement_eligibility, id))

        mysql.connection.commit()
        return jsonify({"message": f"Purchase account with ID {id} updated successfully!"}), 200

    except mysql.connection.Error as err:
        logging.error(f"Database error: {str(err)}")
        return jsonify({"error": f"Database error: {str(err)}"}), 500

    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

    finally:
        cursor.close()



if __name__ == '__main__':
    app.run(debug=True)