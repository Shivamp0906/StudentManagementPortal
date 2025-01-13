from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

client = MongoClient('mongodb://localhost:27017')
db = client['student_db']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/users', methods=['POST', 'GET'])
def data():
    if request.method == 'POST':
        body = request.json
        firstName = body['firstName']
        lastName = body['lastName']
        phoneNumber = body['phoneNumber']
        emailId = body['emailId']
        prn = body['prn']
        year = body['year']
        degree = body['degree']
        department =body['department']
        cgpa = body['cgpa']
        

        db['users'].insert_one({
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": phoneNumber,
            "emailId": emailId,
            "prn": prn,
            "year": year,
            "degree": degree,
            "department": department,
            "cgpa": cgpa
        })

        return jsonify({
            'status': 'Data is posted to MongoDB',
            'firstName': firstName,
            'lastName': lastName,
            'phoneNumber': phoneNumber,
            'emailId': emailId,
            'prn': prn,
            'year': year,
            'degree': degree,
            'department': department,
            'cgpa': cgpa
        })

    if request.method == 'GET':
        allData = db['users'].find()
        dataJson = []
        for data in allData:
            id = data['_id']
            firstName = data['firstName']
            lastName = data['lastName']
            phoneNumber = data['phoneNumber']
            emailId = data['emailId']
            prn = data['prn']
            year = data['year']
            degree = data['degree']
            department = data['department']
            cgpa = data['cgpa']

            dataDict = {
                "id": str(id),
                'firstName': firstName,
                'lastName': lastName,
                'phoneNumber': phoneNumber,
                'emailId': emailId,
                'prn': prn,
                'year': year,
                'degree': degree,
                'department': department,
                'cgpa': cgpa
            }
            dataJson.append(dataDict)

        return jsonify(dataJson)

@app.route('/users/<string:id>', methods=['GET', 'PUT', 'DELETE'])
def onedata(id):
    if request.method == 'GET':
        data = db['users'].find_one({"_id": ObjectId(id)})
        if data:
            id = data['_id']
            firstName = data['firstName']
            lastName = data['lastName']
            phoneNumber = data['phoneNumber']
            emailId = data['emailId']
            prn = data['prn']
            year = data['year']
            degree = data['degree']
            department = data['department']
            cgpa = data['cgpa']

            dataDict = {
                "id": str(id),
                "firstName": firstName,
                "lastName": lastName,
                "phoneNumber": phoneNumber,
                "emailId": emailId,
                "prn": prn,
                "year": year,
                "degree": degree,
                "department": department,
                "cgpa": cgpa
            }

            return jsonify(dataDict)
        else:
            return jsonify({"error": "User not found"}), 404

    if request.method == 'PUT':
        try:
            body = request.json
            firstName = body['firstName']
            lastName = body['lastName']
            phoneNumber = body['phoneNumber']
            emailId = body['emailId']
            prn = body['prn']
            year = body['year']
            degree = body['degree']
            department = body['department']
            cgpa = body['cgpa']
        
            data = db['users'].find_one({"_id": ObjectId(id)})
            if data:
                db['users'].update_one(
                    {"_id": ObjectId(id)},
                    {
                        "$set": {
                            "firstName": firstName,
                            "lastName": lastName,
                            "phoneNumber": phoneNumber,
                            "emailId": emailId,
                            "prn": prn,
                            "year": year,
                            "degree": degree,
                            "department": department,
                            "cgpa": cgpa
                        }
                    }
                )
                return jsonify({
                    "status": "User updated successfully",
                    "id": id,
                    "firstName": firstName,
                    "lastName": lastName,
                    "phoneNumber": phoneNumber,
                    "emailId": emailId,
                    "prn": prn,
                    "year": year,
                    "degree": degree,
                    "department": department,
                    "cgpa": cgpa
                })
            else:
                return jsonify({"error": "User not found"}), 404

        except Exception as e:
            print(f"Error occurred while updating: {str(e)}")
            return jsonify({"error": "Failed to update user"}), 500

    if request.method == 'DELETE':
        db['users'].delete_many({"_id": ObjectId(id)})
        return jsonify({
            "status": f"Data id: {id} is deleted"
        })

if __name__ == '__main__':
    app.debug = True
    app.run()
