using System;
using System.Collections.Generic;
using System.Text.Json;
using Razorpay.Api;

namespace RazorpayHelper
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length < 1)
            {
                PrintJsonError("Action required: 'create-order' or 'verify-payment'");
                Environment.Exit(1);
            }

            string action = args[0].ToLower();

            // Read API credentials from environment variables
            string? keyId = Environment.GetEnvironmentVariable("RAZORPAY_KEY_ID");
            string? keySecret = Environment.GetEnvironmentVariable("RAZORPAY_KEY_SECRET");

            if (string.IsNullOrEmpty(keyId) || string.IsNullOrEmpty(keySecret))
            {
                PrintJsonError("Environment variables RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set");
                Environment.Exit(1);
            }

            try
            {
                // Initialize Razorpay Client first so that static credentials are loaded for subsequent calls
                RazorpayClient client = new RazorpayClient(keyId, keySecret);

                if (action == "create-order")
                {
                    if (args.Length < 2)
                    {
                        PrintJsonError("Usage: create-order <amount_in_paise>");
                        Environment.Exit(1);
                    }

                    if (!long.TryParse(args[1], out long amountInPaise))
                    {
                        PrintJsonError("Amount must be a valid integer");
                        Environment.Exit(1);
                    }

                    if (amountInPaise < 100)
                    {
                        PrintJsonError("Amount must be at least 100 paise (₹1)");
                        Environment.Exit(1);
                    }

                    Dictionary<string, object> options = new Dictionary<string, object>
                    {
                        { "amount", amountInPaise },
                        { "currency", "INR" },
                        { "receipt", "rcpt_" + DateTime.UtcNow.Ticks }
                    };

                    Order order = client.Order.Create(options);

                    var response = new Dictionary<string, object>
                    {
                        { "success", true },
                        { "order_id", order["id"].ToString() },
                        { "amount", Convert.ToInt64(order["amount"]) }
                    };

                    Console.WriteLine(JsonSerializer.Serialize(response));
                }
                else if (action == "verify-payment")
                {
                    if (args.Length < 4)
                    {
                        PrintJsonError("Usage: verify-payment <payment_id> <order_id> <signature>");
                        Environment.Exit(1);
                    }

                    string paymentId = args[1];
                    string orderId = args[2];
                    string signature = args[3];

                    if (string.IsNullOrEmpty(paymentId) || string.IsNullOrEmpty(orderId) || string.IsNullOrEmpty(signature))
                    {
                        PrintJsonError("Payment ID, Order ID, and Signature must not be empty");
                        Environment.Exit(1);
                    }

                    Dictionary<string, string> attributes = new Dictionary<string, string>
                    {
                        { "razorpay_payment_id", paymentId },
                        { "razorpay_order_id", orderId },
                        { "razorpay_signature", signature }
                    };

                    // Signature verification throws SignatureVerificationException if signature is invalid
                    Utils.verifyPaymentSignature(attributes);

                    var response = new Dictionary<string, object>
                    {
                        { "success", true },
                        { "message", "Signature verified successfully" }
                    };

                    Console.WriteLine(JsonSerializer.Serialize(response));
                }
                else
                {
                    PrintJsonError($"Unknown action: {action}");
                    Environment.Exit(1);
                }
            }
            catch (Exception ex)
            {
                PrintJsonError(ex.Message);
                Environment.Exit(1);
            }
        }

        static void PrintJsonError(string message)
        {
            var errorObj = new Dictionary<string, object>
            {
                { "success", false },
                { "error", message }
            };
            Console.WriteLine(JsonSerializer.Serialize(errorObj));
        }
    }
}
