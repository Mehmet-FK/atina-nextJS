import axios from "axios";
import { getSession } from "next-auth/react";

export const getAtinaData = async (url) => {
  const baseURL = "https://pbsolutions.dev/atina/";
  let res = null;
  try {
    const data = await fetch(`${baseURL}${url}`, {
      next: { revalidate: 50 },
    }).then((res) => res.json());
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    res = data;
  } catch (err) {
    const { message } = err;

    console.log(err);
    console.log(message);
  }

  return res;
};

export class AtinaCalls {
  constructor() {
    this.baseUrl = "https://pbsolutions.dev/atina/";
  }

  async fetchData(url) {
    let res = null;
    try {
      const { data } = await axios(`${this.baseUrl}${url}`);
      res = data;
    } catch (error) {
      console.log(error);
    }
    return res;
  }
}
