import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Payment = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const handleSubscribe = async (plan) => {
    const order = await axios({
      method: "post",
      url: BASE_URL + "/payment/create",
      data: {
        plan: plan,
      },
      withCredentials: true,
    });

    const { paymentId, amount, currency, notes } = order.data.data;
    const { key_id } = order.data;

    const verifyPremiumUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/payment/verify", {
          withCredentials: true,
        });

        if (res.data.success) {
          setIsPremiumUser(true);
        }
      } catch (error) {
        console.error("Error verifying premium user:", error);
      }
    };

    const options = {
      key: key_id,
      amount: amount * 100,
      currency: currency,
      name: "DevTinder",
      description: "Connect to other developers and share your projects",
      order_id: paymentId,
      handler: verifyPremiumUser,
      prefill: {
        name: notes.name,
        email: notes.email,
      },
      theme: {
        color: "#3513e0",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      {isPremiumUser ? (
        <div className="alert alert-success shadow-lg">
          <div>
            <h3 className="font-bold">Premium Subscription Activated!</h3>
            <p>
              You are now a premium user and have access to all exclusive
              features.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 py-12">
          <h1 className="text-3xl font-bold">Payment Page</h1>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="card w-96 bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="text-3xl font-bold">Green</h2>
                  <span className="text-xl">₹5,000/month</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>High-resolution image generation</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Customizable style templates</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Batch processing capabilities</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>AI-driven image enhancements</span>
                  </li>
                  <li className="opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="line-through">
                      Seamless cloud integration
                    </span>
                  </li>
                  <li className="opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="line-through">
                      Real-time collaboration tools
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => handleSubscribe("green")}
                    className="btn btn-success btn-block">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="text-3xl font-bold">Gold</h2>
                  <span className="text-xl">₹10,000/month</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>High-resolution image generation</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Customizable style templates</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Batch processing capabilities</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>AI-driven image enhancements</span>
                  </li>
                  <li className="opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="line-through">
                      Seamless cloud integration
                    </span>
                  </li>
                  <li className="opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="line-through">
                      Real-time collaboration tools
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => handleSubscribe("Gold")}
                    className="btn btn-warning btn-block">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Payment;
