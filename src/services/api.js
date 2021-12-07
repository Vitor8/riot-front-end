export async function getGitHub(user) {
  const response = await fetch(`https://api.github.com/search/users?q=${user}`);
  const json = await response.json();

  if (json["total_count"] === 0) return false;
  
  const data = json["items"][0]; 

  return data;
}

export async function getCEP(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }

}
