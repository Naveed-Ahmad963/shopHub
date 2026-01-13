import { Toaster } from "react-hot-toast";

function ToasterConfig() {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 100,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#1f2937",
            padding: "20px 32px",
            borderRadius: "16px",
            fontSize: "16px",
            fontWeight: "600",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.1)",
            minWidth: "400px",
            maxWidth: "600px",
          },
          success: {
            duration: 1000,
            style: {
              background: "#ffffff",
              color: "#1f2937",
              padding: "18px 28px",
              fontSize: "15px",
              fontWeight: "500",
              boxShadow:
                "0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.08)",
              borderRadius: "8px",
              borderLeft: "4px solid #10b981",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            duration: 2000,
            style: {
              background: "#ffffff",
              color: "#1f2937",
              padding: "18px 28px",
              fontSize: "15px",
              fontWeight: "500",
              boxShadow:
                "0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.08)",
              borderRadius: "8px",
              borderLeft: "4px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
          loading: {
            style: {
              background: "#ffffff",
              color: "#1f2937",
              padding: "18px 28px",
              fontSize: "15px",
              fontWeight: "500",
              boxShadow:
                "0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.08)",
              borderRadius: "8px",
              borderLeft: "4px solid #2563eb",
            },
            iconTheme: {
              primary: "#2563eb",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </div>
  );
}

export default ToasterConfig;
