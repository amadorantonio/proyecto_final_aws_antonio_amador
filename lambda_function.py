import json
import boto3
from datetime import datetime
import os
import traceback

def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table('ProductsTable')
    
    method = event['httpMethod']
    print(method)
    
    try:
        method = event['httpMethod']

        if method == 'GET':
            
            if event['sku'] == "":
            
                # Obtener lista de productos
                products = table.scan()
    
                return {
                    'statusCode': 200,
                    'body': products
                }
            
            else:
                
                product = table.get_item(
                    Key={
                        "sku": event['sku'],
                        "fecha_creacion": event['fecha_creacion']
                    }
                )
                
                return {
                    'statusCode': 200,
                    'body': product
                }
                
        elif method == "POST":
            item = event["body"]
            response = table.put_item(
                Item=item
            )
            return {
                "statusCode": 200,
                "body": response
            }
            
        elif method == "PUT":
            item = event["body"]
            response = table.put_item(
                Item=item
            )
            return {
                "statusCode": 200,
                "body": response
            }
            
        elif method == "DELETE":
            
            response = table.delete_item(
                Key={
                    "sku": event['sku'],
                    "fecha_creacion": event['fecha_creacion']
                }
            )
            return {
                "statusCode": 200,
                "body": response
            }
        
        else:
            return {
                'statusCode': 200,
                'body': json.dumps('Hello from Lambda!')
            }
    except Exception as e:
        print(e)
        return {
            'statusCode': 400,
            'message': str(e)
        }
        
        
    
    
