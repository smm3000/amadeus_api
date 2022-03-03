import axios from "axios";
const { CancelToken } = axios;
const search = (input) => {
  if (input) {
    try {
      const source = CancelToken.source();
      const request = axios.get(`/api/search?keyword=${input}`, {
        cancelToken: source.token,
      });
      return {
        async process(callback) {
          request.then((response) => {
            const json = response.data;
            if (json && json.data) {
              callback(
                json.data.map(({ address }) => {
                  return {
                    city: address.cityName,
                    code: address.cityCode,
                    country: address.countryName,
                    state: address.stateCode,
                  };
                })
              );
            }
          })
        },
        cancel() {
          source.cancel();
        },
      };
    } catch (error) {
      console.error(error);
    }
  }
  return {
    process() {
      return [];
    },
    cancel() {},
  };
};

const getHotels = async (cityCode, checkInDate, checkOutDate) => {
    try {
      const response = await axios.get(
        `/api/hotels?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
      );
      const json = response.data;
  
      if (json && json.data) {
        return json.data.map(({ hotel }) => hotel);
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const getOffers = async (hotelId) => {
    try {
      const response = await axios.get(`/api/offers?hotelId=${hotelId}`);
      const json = response.data;
      if (json && json.data) {
        return json.data.offers;
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };
  

export { search, getHotels, getOffers };