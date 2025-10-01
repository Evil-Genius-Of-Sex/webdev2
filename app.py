from flask import Flask, request, render_template 

app = Flask(__name__)

@app.route("/") 

def index(): 
    return render_template("index.html") 

@app.route("/about") 

def about(): 
    return render_template("about.html") 

@app.route('/submit', methods=["POST"]) 

def submit(): 

    username = request.form['fname'] 

    message = request.form['lname'] 

    return f"Thanks {username} {message}" 





if __name__ == "__main__":
    app.run(debug=True)