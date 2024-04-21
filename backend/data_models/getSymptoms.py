from pydantic import BaseModel

class GetSymptoms(BaseModel):
    month: str
    week: str
    district: str
    city: str
    age: str