from pydantic import BaseModel

class Symptoms(BaseModel):
    symptom: str
    month: str
    week: str
    district: str
    city: str
    age: str