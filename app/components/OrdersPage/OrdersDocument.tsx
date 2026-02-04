"use client";

import { Document, Page, View, Text, pdf } from "@react-pdf/renderer";

const generateAdminOrdersListPDF = async (orders) => {
  const styles = {
  page: {
    padding: 30,
    fontSize: 10,
    borderWidth: 1,
    borderColor: "black",
      boxSizing: "border-box",
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    borderBottomWidth: 1,
    fontWeight: 700,
    backgroundColor: "#f2f2f2",
  },
  cellCustomer: { width: 80, padding: 4 },
  cellEmail: { width: 120, padding: 4 },
  cellMobile: { width: 70, padding: 4 },
  cellAddress: { width: 150, padding: 4 },
  cellAmount: { width: 70, padding: 4, textAlign: "right" },
};
const grandTotal = orders.reduce((sum, order) => {
  return (
    sum +
    order.items.reduce(
      (s, item) =>
        s + (item.Product?.Product_price || item.price || 0),
      0
    )
  );
}, 0);
  const OrdersListDocument = () => (
    <Document>
<Page size="A4" style={styles.page}>
  <Text style={styles.title}>Orders Summary</Text>

        {/* TABLE HEADER */}
       <View style={[styles.row, styles.header]}>
    <Text style={styles.cellCustomer}>Customer</Text>
    <Text style={styles.cellEmail}>Email</Text>
    <Text style={styles.cellMobile}>Mobile</Text>
    <Text style={styles.cellAddress}>Address</Text>
    <Text style={styles.cellAmount}>Amount</Text>
  </View>

        {/* TABLE ROWS */}
        {orders.map((order, index) => {
          const total = order.items.reduce(
            (sum, item) =>
              sum + (item.Product?.Product_price || item.price || 0),
            0
          );


          return (
            <View key={order.id} style={[styles.row, { borderBottomWidth: 0.5 }]}>
        <Text style={styles.cellCustomer}>{order.customer_name}</Text>
    <Text style={styles.cellEmail} wrap>
  {order.email.replace(/(.{15})/g, "$1 ")}
</Text>
        <Text style={styles.cellMobile}>{order.mobile || "-"}</Text>
        <Text style={styles.cellAddress}>{order.address || "-"}</Text>
        <Text style={styles.cellAmount}>₹{total}</Text>
      </View>
    
          );
        })}
          <View
  style={{
    flexDirection: "row",
    borderTopWidth: 1,
    marginTop: 6,
    fontWeight: 700,
  }}
>
  <Text style={{ width: 450, padding: 4, textAlign: "right" }}>
    Grand Total
  </Text>
  <Text style={styles.cellAmount}>₹{grandTotal}</Text>
</View>

        <Text
  style={{
    position: "absolute",
    bottom: 10,
    right: 20,
    fontSize: 9,
  }}
  render={({ pageNumber, totalPages }) =>
    `Page ${pageNumber} of ${totalPages}`
  }
/>

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
