from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # get the parameters from the form
        logemail = request.form['logemail']
        logname = request.form['logname']
        age = request.form['age']
        gender = request.form['gender']
        # call the registerUser.js file with the parameters
        # replace the path with the actual path to your file
        subprocess.call(['node', './ticketadda/javascript/createPassenger.js', logemail, logname, age, gender])

        return 'User registered successfully!'
    else:
        # show the registration form
        return render_template('index.html')
    
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        logemail = request.form['logemail']
        logpass = request.form['logpass']

        subprocess.call(['node', './ticketadda/javascript/queryPassenger.js'], logemail, logpass)

if __name__ == '__main__':
    app.run(debug=True)
