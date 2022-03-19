const BASE_URL = 'https://mland-api.sotatek.works/api/v1/user/server-status';
window.web3gl.infoServer = {
  status: null,
};

const getSvStatus = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}`);

    console.log('data', data);
    window.web3gl.infoServer.status = data;

    return data;
  } catch (errors) {
    console.error(errors);
  }
};
getSvStatus();
