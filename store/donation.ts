import axios from "axios";
import { useUserStore } from "./user";

export async function handleDonationClick(price: number) {
  const { id } = useUserStore();

  if (typeof price === "number" && !isNaN(price)) {
    // Check if it is an integer
    if (Number.isInteger(price) && price > 0) {
      console.log(`${price} is an integer.`);
    } else if (price <= 0) {
      alert("Price must be greater than 0");
      return;
    } else {
      alert("Float value is not accepted");
      return;
    }
  } else {
    alert("Invalid price value");
    return;
  }

  const donationData = {
    amount: price,
    seller_id: id,
    plan_type: 2,
  };

  try {
    const response = await axios.post("/stripe-subscription", donationData);
    if (response.data.status === "success") {
      window.location.href = response.data.stripe_payment_url
    } else {
      console.log("Stripe payment URL not found!!!");
    }
  } catch (error) {
    console.error("Error making donation:", error);
  }
}

export async function handleSubscribeClick(price: number) {
  const { id } = useUserStore();

  if (typeof price === "number" && !isNaN(price)) {
    // Check if it is an integer
    if (Number.isInteger(price) && price > 0) {
      console.log(`${price} is an integer.`);
    } else if (price <= 0) {
      alert("Price must be greater than 0");
      return;
    } else {
      alert("Float value is not accepted");
      return;
    }
  } else {
    alert("Invalid price value");
    return;
  }

  const donationData = {
    amount: price,
    seller_id: id,
    plan_type: 1,
  };

  try {
    const response = await axios.post("/stripe-subscription", donationData);
    if (response.data.status === "success") {
      window.location.href = response.data.stripe_payment_url
    } else {
      console.log("Stripe payment URL not found!!!");
    }
    console.log("response", response.data);
  } catch (error) {
    console.error("Error making donation:", error);
  }
}