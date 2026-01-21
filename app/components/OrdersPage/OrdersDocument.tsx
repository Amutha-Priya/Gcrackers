"use client";

import { Document, Page, View, Text, pdf } from "@react-pdf/renderer";

const generateAdminOrdersListPDF = async (orders) => {
  const OrdersListDocument = () => (
    <Document>
      <Page size="A4" style={{ padding: 20, fontSize: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Orders Summary
        </Text>

        {/* TABLE HEADER */}
        <View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
          <Text style={{ width: "20%" }}>Customer</Text>
          <Text style={{ width: "25%" }}>Email</Text>
          <Text style={{ width: "15%" }}>Mobile</Text>
          <Text style={{ width: "25%" }}>Address</Text>
          <Text style={{ width: "15%", textAlign: "right" }}>Amount</Text>
        </View>

        {/* TABLE ROWS */}
        {orders.map((order, index) => {
          const total = order.items.reduce(
            (sum, item) =>
              sum + (item.Product?.Product_price || item.price || 0),
            0
          );

          return (
            <View
              key={order.id}
              style={{ flexDirection: "row", borderBottomWidth: 0.5 }}
            >
              <Text style={{ width: "20%" }}>{order.customer_name}</Text>
              <Text style={{ width: "25%" }}>{order.email}</Text>
              <Text style={{ width: "15%" }}>{order.mobile || "-"}</Text>
              <Text style={{ width: "25%" }}>{order.address || "-"}</Text>
              <Text style={{ width: "15%", textAlign: "right" }}>
                ₹{total}
              </Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );

  const blob = await pdf(<OrdersListDocument />).toBlob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Orders_List_${Date.now()}.pdf`;
  link.click();
};

export default generateAdminOrdersListPDF;
