from fastapi import FastAPI, HTTPException, Depends, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import status
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import mysql.connector
from fastapi import File, UploadFile

from data_models.login_model import UserLogin
from data_models.register_model import UserRegister
from data_models.editUser_model import EditUser
from data_models.deleteUser_model import DeleteUser
from data_models.health_model import Health
from data_models.symptoms import Symptoms
from data_models.getSymptoms import GetSymptoms

import pandas as pd
import numpy as np
import pickle
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler, LabelEncoder

app = FastAPI()

# Enable CORS allowing all origins and methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "realhack5"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_WEEKS = 2

# pass123 for localhost
# pass1234 for AWS RDS
connection = mysql.connector.connect(user="root", password="pass1234", host="test.czciuecec3mk.us-east-1.rds.amazonaws.com", port="3306", database="test")

async def read_users():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        if users:
            columns = [column[0] for column in cursor.description]
            users = [dict(zip(columns, row)) for row in users]     
            return users
        else:
            return None
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cursor.close()  # Close the cursor

async def update_user(name, email, password, phone, address):
    cursor = connection.cursor()
    try:
        # Use placeholders in the query and pass values as a tuple to cursor.execute()
        query = "UPDATE users SET `name` = %s, `email` = %s, `password` = %s, `address` = %s WHERE `phone` = %s"
        cursor.execute(query, (name, email, password, address, phone))
        connection.commit()  # Commit the transaction
    except Exception as err:
        print(f"Error: {err}")
    finally:
        cursor.close()  # Close the cursor

async def delete_user(phone):
    cursor = connection.cursor()
    try:
        # Use placeholders in the query and pass values as a tuple to cursor.execute()
        query = "DELETE FROM users WHERE phone = %s"
        cursor.execute(query, (phone,))
        connection.commit()  # Commit the transaction
    except Exception as err:
        print(f"Error: {err}")
    finally:
        cursor.close()  # Close the cursor

async def read_user_by_phone_and_level(phone, level):
    cursor = connection.cursor()
    try:
        # Use parameterized query to prevent SQL injection
        query = "SELECT * FROM users WHERE phone = %s AND level = %s"
        cursor.execute(query, (phone, level))
        user = cursor.fetchone()
        
        if user:
            columns = [column[0] for column in cursor.description]
            user = dict(zip(columns, user))
            return user
        else:
            return None
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cursor.close()  # Close the cursor


async def create_user(name, email, password, phone, address, level):
    cursor = connection.cursor()
    try:
        # Use placeholders in the query and pass values as a tuple to cursor.execute()
        query = "INSERT INTO users (`name`, `email`, `password`, `phone`, `address`, `level`) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (name, email, password, phone, address, level))
        connection.commit()  # Commit the transaction
    except Exception as err:
        print(f"Error: {err}")
    finally:
        cursor.close()  # Close the cursor

async def create_symptoms(symptom, month, week, district, city, age):
    cursor = connection.cursor()
    try:
        # Use placeholders in the query and pass values as a tuple to cursor.execute()
        query = "INSERT INTO symptoms (`symptom`, `month`, `week`, `district`, `city`, `age`) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (symptom, month, week, district, city, age,))
        connection.commit()  # Commit the transaction
    except Exception as err:
        print(f"Error: {err}")
    finally:
        cursor.close()  # Close the cursor

async def get_symptoms():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM symptoms")
        data = cursor.fetchall()
        if data:
            columns = [column[0] for column in cursor.description]
            data = [dict(zip(columns, row)) for row in data]     
            return data
        else:
            return None
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cursor.close()  # Close the cursor

async def get_symptomCount(month, week, district, city, age):
    cursor = connection.cursor()

    if month != "" and week == "" and district == "" and city == "" and age == "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `month` = %s GROUP BY symptom;"
            cursor.execute(query, (month,))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor
    elif month != "" and week != "" and district == "" and city == "" and age == "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `month` = %s AND `week` = %s GROUP BY symptom;"
            cursor.execute(query, (month, week,))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor
    elif month != "" and week != "" and district != "" and city == "" and age == "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `month` = %s AND `week` = %s AND `district` = %s GROUP BY symptom;"
            cursor.execute(query, (month, week, district,))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor
    elif month != "" and week != "" and district != "" and city != "" and age == "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `month` = %s AND `week` = %s AND `district` = %s AND `city` = %s GROUP BY symptom;"
            cursor.execute(query, (month, week, district, city))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor
    elif month != "" and week != "" and district != "" and city != "" and age != "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `month` = %s AND `week` = %s AND `district` = %s AND `city` = %s AND `age` = %s GROUP BY symptom;"
            cursor.execute(query, (month, week, district, city, age,))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor
    elif month == "" and week == "" and district != "" and city == "" and age == "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `district` = %s GROUP BY symptom;"
            cursor.execute(query, (district,))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor
    elif month == "" and week == "" and district == "" and city != "" and age == "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `city` = %s GROUP BY symptom;"
            cursor.execute(query, (city,))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor
    elif month == "" and week == "" and district != "" and city != "" and age == "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `district` = %s AND `city` = %s GROUP BY symptom;"
            cursor.execute(query, (district, city,))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor
    elif month == "" and week == "" and district != "" and city == "" and age != "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `district` = %s AND `age` = %s GROUP BY symptom;"
            cursor.execute(query, (district, age,))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor
    elif month == "" and week == "" and district == "" and city != "" and age != "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `city` = %s AND `age` = %s GROUP BY symptom;"
            cursor.execute(query, (city, age))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor
    elif month == "" and week == "" and district == "" and city == "" and age != "":
        try:
            query = "SELECT COUNT(ID) AS Rcount, symptom FROM symptoms WHERE `age` = %s GROUP BY symptom;"
            cursor.execute(query, (age,))
            data = cursor.fetchall()
            if data:
                columns = [column[0] for column in cursor.description]
                data = [dict(zip(columns, row)) for row in data]     
                return data
            else:
                return None
        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()  # Close the cursor


async def create_healthData(
    phone, 
    name, 
    age, 
    city, 
    district, 
    description, 
    symptom1, 
    symptom2, 
    symptom3, 
    symptom4, 
    symptom5, 
    symptom6, 
    symptom7, 
    symptom8, 
    symptom9, 
    symptom10,
    symptom11,
    symptom12,
    symptom13,
    symptom14,
    symptom15,
    symptom16,
    symptom17
    ):
    cursor = connection.cursor()
    try:
        # Use placeholders in the query and pass values as a tuple to cursor.execute()
        query = "INSERT INTO health_data (`phone`, `name`, `age`, `city`, `district`, `description`, `symptom1`, `symptom2`, `symptom3`, `symptom4`, `symptom5`, `symptom6`, `symptom7`, `symptom8`, `symptom9`, `symptom10`, `symptom11`, `symptom12`, `symptom13`, `symptom14`, `symptom15`, `symptom16`, `symptom17`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(query, 
            (phone, 
            name, 
            age, 
            city, 
            district, 
            description, 
            symptom1, 
            symptom2, 
            symptom3, 
            symptom4, 
            symptom5, 
            symptom6, 
            symptom7, 
            symptom8, 
            symptom9, 
            symptom10,
            symptom11,
            symptom12,
            symptom13,
            symptom14,
            symptom15,
            symptom16,
            symptom17
            ))
        connection.commit()  # Commit the transaction
    except Exception as err:
        print(f"Error: {err}")
    finally:
        cursor.close()  # Close the cursor

async def predictDecease(symptoms):

    # Load the LabelEncoder object
    with open('ai_models/decease_prediction/label_encoder.pkl', 'rb') as f:
        label_encoder = pickle.load(f)

    # Load the StandardScaler object
    with open('ai_models/decease_prediction/scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
        
    # Load the column names
    with open('ai_models/decease_prediction/columns.pkl', 'rb') as f:
        column_names = pickle.load(f)

    # Load the model
    model = load_model('ai_models/decease_prediction/decease_prediction_model.h5')
    
    # Create a new dataframe for the input
    input_df = pd.DataFrame(columns=column_names)
    input_df.loc[0] = 0

    # Set the appropriate columns to 1 based on the input symptoms
    for symptom in symptoms:
        for col in input_df.columns:
            if symptom in col:
                input_df.loc[0, col] = 1

    # Standardize the input
    input_data = scaler.transform(input_df)

    # Make a prediction
    prediction = model.predict(input_data)

    # Decode the prediction
    disease = label_encoder.inverse_transform([np.argmax(prediction)])

    print(f"The predicted disease is: {disease[0]}")

    # Load the treatment data
    treatment_df = pd.read_csv('ai_models/decease_prediction/Disease precaution.csv')

    # Locate the disease in the treatment data
    treatment = treatment_df.loc[treatment_df['Disease'] == disease[0]]
    treatment_list = []
    # Print the treatment plan
    print("The suggested treatment plan is:")
    for i in range(1, 5):
        #print(f"Precaution_{i}: {treatment[f'Precaution_{i}'].values[0]}")
        treatment_list.append(treatment[f'Precaution_{i}'].values[0])

    print(treatment_list)
    return [disease[0], treatment_list]

async def get_healthData():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM health_data")
        users = cursor.fetchall()
        if users:
            columns = [column[0] for column in cursor.description]
            users = [dict(zip(columns, row)) for row in users]     
            return users
        else:
            return None
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cursor.close()  # Close the cursor

async def get_healthData_by_phone(phone):
    cursor = connection.cursor()
    try:
        query = "SELECT * FROM health_data WHERE phone = %s"
        cursor.execute(query, (phone))
        users = cursor.fetchall()
        if users:
            columns = [column[0] for column in cursor.description]
            users = [dict(zip(columns, row)) for row in users]     
            return users
        else:
            return None
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cursor.close()  # Close the cursor

async def get_healthData_by_district(district):
    cursor = connection.cursor()
    try:
        query = "SELECT * FROM health_data WHERE district = %s"
        cursor.execute(query, (district))
        users = cursor.fetchall()
        if users:
            columns = [column[0] for column in cursor.description]
            users = [dict(zip(columns, row)) for row in users]     
            return users
        else:
            return None
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cursor.close()  # Close the cursor

async def get_healthData_by_city(city):
    cursor = connection.cursor()
    try:
        query = "SELECT * FROM health_data WHERE city = %s"
        cursor.execute(query, (city))
        users = cursor.fetchall()
        if users:
            columns = [column[0] for column in cursor.description]
            users = [dict(zip(columns, row)) for row in users]     
            return users
        else:
            return None
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cursor.close()  # Close the cursor

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    try:
        isMatching = pwd_context.verify(plain_password, hashed_password)
        return isMatching
    except Exception as err:
        print(f"Error: {err}")
        return False

def get_password_hash(password):
    return pwd_context.hash(password)

async def get_user(phone: str, level: str):
    user = await read_user_by_phone_and_level(phone, level)
    return user    # return a dictionary

async def authenticate_user(phone: str, password: str, level: str):
    user = await get_user(phone, level)
    print(user)
    if not user:
        return False
    if not verify_password(password, user["password"]):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        #print(payload)
        phone: str = payload.get("sub")
        if phone is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await get_user(phone, "user")
    if user is None:
        raise credentials_exception
    #print(user)
    return user

async def get_current_admin(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        #print(payload)
        phone: str = payload.get("sub")
        if phone is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await get_user(phone, "admin")
    if user is None:
        raise credentials_exception
    #print(user)
    return user


@app.get("/health")
async def health():
    return {"backend is running"}

# first time login and it returns token
@app.post("/token")
async def login_for_access_token(user_login: UserLogin):
    user = await authenticate_user(user_login.phone, user_login.password, user_login.level)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(weeks=ACCESS_TOKEN_EXPIRE_WEEKS)
    access_token = create_access_token(
        data={"sub": user["phone"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "expires_in": access_token_expires, "token_type": "bearer"}

# login using token stored in browser for user level
@app.get("/login/user")
async def login_using_token_user(current_user = Depends(get_current_user)):
    return current_user

# login using token stored in browser for admin level
@app.get("/login/admin")
async def login_using_token_admin(current_user = Depends(get_current_admin)):
    return current_user

@app.post("/register")
async def register(user_register: UserRegister):
    try:
       pwd_hash = get_password_hash(user_register.password)
       await create_user(
           name=user_register.name, 
           email=user_register.email,
           password=pwd_hash,
           phone=user_register.phone,
           address=user_register.address,
           level=user_register.level
        )
       
       return {"message": "User registered successfully"}
    except Exception as err:
        print(f"Error: {err}")
        return {"message": "Failed to register user"}, status.HTTP_400_BAD_REQUEST

@app.get("/getUsers")
async def get_users():
    users = await read_users()
    return users

@app.post("/editUser")
async def editUser(user: EditUser):
    try:
       pwd_hash = get_password_hash(user.password)
       await update_user(
           name=user.name, 
           email=user.email,
           password=pwd_hash,
           phone=user.phone,
           address=user.address,
        )
       
       return {"message": "User updated successfully"}
    except Exception as err:
        print(f"Error: {err}")
        return {"message": "Failed to update user"}, status.HTTP_400_BAD_REQUEST
    
@app.post("/deleteUser")
async def deleteUser(user: DeleteUser):
    try:
       await delete_user( 
           phone=user.phone,
        )
       
       return {"message": "User deleted successfully"}
    except Exception as err:
        print(f"Error: {err}")
        return {"message": "Failed to delete user"}, status.HTTP_400_BAD_REQUEST

@app.post("/create_health")
async def create_health(health: Health):
    try:
        await create_healthData(
           phone=health.phone,
           name=health.name,
           age=health.age,
           city=health.city,
           district=health.district,
           description=health.description,
           symptom1=health.symptom1,
           symptom2=health.symptom2,
           symptom3=health.symptom3,
           symptom4=health.symptom4,
           symptom5=health.symptom5,
           symptom6=health.symptom6,
           symptom7=health.symptom7,
           symptom8=health.symptom8,
           symptom9=health.symptom9,
           symptom10=health.symptom10,
           symptom11=health.symptom11,
           symptom12=health.symptom12,
           symptom13=health.symptom13,
           symptom14=health.symptom14,
           symptom15=health.symptom15,
           symptom16=health.symptom16,
           symptom17=health.symptom17,
        )
       
        if(health.symptom1 != ""):
            await create_symptoms(
                symptom=health.symptom1,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
       
       
        if health.symptom2 != "":
           await create_symptoms(
                symptom=health.symptom2,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        

        if health.symptom3 != "":
           await create_symptoms(
                symptom=health.symptom3,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
       
        if health.symptom4 != "":
           await create_symptoms(
                symptom=health.symptom4,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom5 != "":
           await create_symptoms(
                symptom=health.symptom5,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom6 != "":
           await create_symptoms(
                symptom=health.symptom6,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom7 != "":
           await create_symptoms(
                symptom=health.symptom7,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
           
        if health.symptom8 != "":
           await create_symptoms(
                symptom=health.symptom8,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom9 != "":
           await create_symptoms(
                symptom=health.symptom9,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom10 != "":
           await create_symptoms(
                symptom=health.symptom10,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom11 != "":
           await create_symptoms(
                symptom=health.symptom11,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom12 != "":
           await create_symptoms(
                symptom=health.symptom12,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom13 != "":
           await create_symptoms(
                symptom=health.symptom13,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
           
        if health.symptom14 != "":
           await create_symptoms(
                symptom=health.symptom14,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom15 != "":
           await create_symptoms(
                symptom=health.symptom15,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom16 != "":
           await create_symptoms(
                symptom=health.symptom16,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )
        
        if health.symptom17 != "":
           await create_symptoms(
                symptom=health.symptom17,
                month=health.month,
                week=health.week,
                district=health.district,
                city=health.city,
                age=health.age
            )

        res = await predictDecease([
           health.symptom1,
           health.symptom2,
           health.symptom3,
           health.symptom4,
           health.symptom5,
           health.symptom6,
           health.symptom7,
           health.symptom8,
           health.symptom9,
           health.symptom10,
           health.symptom11,
           health.symptom12,
           health.symptom13,
           health.symptom14,
           health.symptom15,
           health.symptom16,
           health.symptom17
       ])

        decease = res[0]
        treatments = res[1]
       
        return {
           "message": "health data entered successfully",
            "decease": decease,
            "treatments": treatments
        }
    except Exception as err:
        print(f"Error: {err}")
        return {"message": "Failed to enter health data"}, status.HTTP_400_BAD_REQUEST

@app.post("/getSymptomCount")
async def getSymptomCount(symp: GetSymptoms):
    data = await get_symptomCount(
        month=symp.month,
        week=symp.week,
        district=symp.district,
        city=symp.city,
        age=symp.age
        )
    return data


@app.get("/getUsers")
async def get_users():
    users = await read_users()
    return users
    
@app.post("/get_health")
async def get_health():
    health_data = await get_healthData()
    return health_data

@app.post("/get_health/${phone}")
async def get_health(phone: str):
    health_data = await get_healthData_by_phone(phone)
    return health_data

@app.post("/get_health/${district}")
async def get_health(district: str):
    health_data = await get_healthData_by_phone(district)
    return health_data

@app.post("/get_health/${city}")
async def get_health(city: str):
    health_data = await get_healthData_by_phone(city)
    return health_data