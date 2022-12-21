from flask import Flask,request
from flask_cors import CORS,cross_origin
import pandas as pd
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

logistic_model = pickle.load(open('Models/finalLinearModelPipeline.pkl','rb'))
binary_model = pickle.load(open('Models/finalBineryTreeClassPipeline.pkl','rb'))

@app.route('/home',methods=['GET'])
def home():

    dataset = pd.read_csv('Dataset/marketing_campaign.csv',sep='\t')
    Education=sorted(dataset['Education'].unique())
    Marital_Status=sorted(dataset['Marital_Status'].unique())
    
    return {
        'resultStatus': 'SUCCESS',
        'message': {
                    'header':"Company's Ideal Customers Marketing Strategy",
                    'content':"Welcome, It helps a business to better understand its customers and makes it easier for them to modify products according to the specific needs, behaviors and concerns of different types of customers.",
                    'education_category':Education,
                    'marital_status_category':Marital_Status
                    } 
        }
  
@app.route('/logistic',methods=['POST'])
@cross_origin()
def predictLogistic():
    data = request.get_json()
    print(data['algorithm'])
    Year_Birth=int(data['Year_Birth'])
    Education=data['Education']
    Marital_Status=data['Marital_Status']
    Income=data['Income']
    Recency=data['Recency']
    MntWines=data['MntWines']
    MntFruits=data['MntFruits']
    MntMeatProducts=data['MntMeatProducts']
    MntFishProducts=data['MntFishProducts']
    MntSweetProducts=data['MntSweetProducts']
    MntGoldProds=data['MntGoldProds']
    NumDealsPurchases=data['NumDealsPurchases']
    NumWebPurchases=data['NumWebPurchases']
    NumCatalogPurchases=data['NumCatalogPurchases']
    NumStorePurchases=data['NumStorePurchases']
    AcceptedCmp3=data['AcceptedCmp3']
    AcceptedCmp4=data['AcceptedCmp4']		
    AcceptedCmp5=data['AcceptedCmp5']
    AcceptedCmp1=data['AcceptedCmp1']		
    AcceptedCmp2=data['AcceptedCmp2']	
    Complain=data['Complain']	
    Childrens=data['Childrens']

    query = np.array([Year_Birth,Education,Marital_Status,Income,Recency,MntWines,MntFruits,MntMeatProducts,MntFishProducts,MntSweetProducts,MntGoldProds,NumDealsPurchases,NumWebPurchases,NumCatalogPurchases,NumStorePurchases,AcceptedCmp3,AcceptedCmp4,AcceptedCmp5,AcceptedCmp1,AcceptedCmp2,Complain,Childrens]).reshape(1,22)
    if data['algorithm'][1:] =='logistic':
        result = logistic_model.predict(query)[0]
        return str(result)
    elif data['algorithm'][1:] =='binary':
        result = binary_model.predict(query)[0]
        return str(result)
    else:
        return 'Hello world'

if __name__=="__main__":
    app.run(debug=True)    