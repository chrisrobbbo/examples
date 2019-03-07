'use strict'

import * as uuid from 'uuid'

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

export function create (event, context, callback) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: data.id,
      message: data.message,
      status: data.status
    }
  }

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error('Couldn\'t create the drain-bine item.'))
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result)
    }
    callback(null, response)
  })
}

export function list (event, context, callback) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error('Couldn\'t get drain-bine table.'))
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result)
    }
    callback(null, response)
  })
}
