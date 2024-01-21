from flask import Flask, session, url_for, render_template, jsonify, request, redirect
import json
from dmm import LoginTable, EventTable
from flask_cors import CORS

app = Flask("eventexpert")
CORS(app)
app.secret_key = "eventkey"

@app.route('/',methods = ['GET','POST'])
def home():
    if 'username' not in session:
        return render_template('homeMain.html')
    else:
        return render_template('homeDashboard.html',username = session['username'])
    
@app.route('/login',methods = ['POST','GET'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        if data['type'] == 'login':
            if LoginTable.checkInfo(data['username'].lower(),data['password']):
                print('passed')
                session['username'] = data['username']
                return jsonify({"status":"success"})
            else:
                return jsonify({"status":"fail"})
        else:
            if not LoginTable.checkUser(data['username']):
                session['username'] = data['username']
                print(data['username'])
                check = LoginTable.addUser(data['username'].lower(),data['password'])
                if check:
                    return jsonify({"status":"signedup"})
                return jsonify({"status":"exists"})
            return jsonify({"status":"exists"})
    
    else:
        return render_template('loginsignup.html')

@app.route('/createevent',methods=['GET','POST'])
def createEvent():
    if request.method == 'GET':
        return render_template('createEvent.html')
    else:
        data = request.get_json()
        event_limit = data['eventlimit'].lower() == 'yes'
        if EventTable.addEvent(data['eventname'], data['eventdescription'], data['eventlogo'], data['eventcategory'], data['eventtype'], data['eventreach'], data['eventlocation'], event_limit, data['eventlimitnumber'], data['eventprice'], data['eventpaymentlink'], data['eventstartdate'], data['eventenddate'], data['eventclosingdate']):
            return jsonify({"status":"success"})
        else:
            return jsonify({"status":"fail"})
        
@app.route('/joinevent',methods=['GET','POST'])
def joinEvent():
    if request.method == 'GET':
        return render_template('joinEvent.html',data = EventTable.getEvents())
    else:
        pass

@app.route('/joinevent/<int:id>')
def joinEventId(id):
    return render_template('joinEventId.html',data = EventTable.getEvent(id)[0])

@app.route('/logout')
def logout():
    session.pop('username',None)
    return redirect(url_for('home'))

# @app.route('/send-data')
# def sendData():
#     data = EventTable

if __name__ == '__main__':
    app.run(port = '5000',host = '0.0.0.0',debug=True)
