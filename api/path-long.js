const { name } = request.query; 
return response.end(`Hello ${name}!`);