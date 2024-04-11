export async function getDynamoProducts() {
    let url = `https://4syq9b7usj.execute-api.us-east-1.amazonaws.com/dev/products`
    const response = await fetch(url, {headers: {"x-api-key": "RGPiuZyudU7euk0lWDrn7wLzUvRo1Qk2XVHFnZLh"}})
    const responseJSON = await response.json()
    return responseJSON
}

export async function getDynamoProduct(product) {
    let url = `https://4syq9b7usj.execute-api.us-east-1.amazonaws.com/dev/products?sku=${product.sku}&fecha_creacion=${product.fecha_creacion}`
    const response = await fetch(url, {headers: {"x-api-key": "RGPiuZyudU7euk0lWDrn7wLzUvRo1Qk2XVHFnZLh"}})
    const responseJSON = await response.json()
    return responseJSON
}

export async function insertProduct(product) {
    let url = `https://4syq9b7usj.execute-api.us-east-1.amazonaws.com/dev/products`

    const response = await fetch(url, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "RGPiuZyudU7euk0lWDrn7wLzUvRo1Qk2XVHFnZLh"
      },
    body: JSON.stringify(product)
    })

    const responseJSON = await response.json()
    return responseJSON
}

export async function editProduct(product) {
    let url = `https://4syq9b7usj.execute-api.us-east-1.amazonaws.com/dev/products`

    const response = await fetch(url, {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "RGPiuZyudU7euk0lWDrn7wLzUvRo1Qk2XVHFnZLh"
      },
    body: JSON.stringify(product)
    })

    const responseJSON = await response.json()
    return responseJSON
}

export async function deleteProduct(product) {
    let url = `https://4syq9b7usj.execute-api.us-east-1.amazonaws.com/dev/products?sku=${product.sku}&fecha_creacion=${product.fecha_creacion}`

    const response = await fetch(url, {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "RGPiuZyudU7euk0lWDrn7wLzUvRo1Qk2XVHFnZLh"
      },
    })

    const responseJSON = await response.json()
    return responseJSON
}