"use client";

import {
  Document,
  Page,
  View,
  Text,
  Image as PDFImage,
  pdf,
} from "@react-pdf/renderer";

const generateAdminOrderPDF = async (order: any) => {
  if (!order || !order.id) {
    alert("Invalid order data");
    return;
  }

  const orderedItems = order.items || [];
  const itemsPerPage = 20;
  const totalPages = Math.ceil(orderedItems.length / itemsPerPage);

  const getPageTotal = (items: any[]) =>
    items.reduce((sum, item) => sum + (item.total || item.price * item.qty || 0), 0);

const getQty = (item: any) =>
  Number(
    item.qty ??
    item.quantity ??
    item.OrderItem?.qty ??
    item.OrderItem?.quantity ??
    1   // fallback
  );


  const netTotal = orderedItems.reduce(
  (sum, item) => sum + (item.total ?? item.price * getQty(item)),
  0
);

  const columns = {
    sno: "5%",
    product: "45%",
    qty: "15%",
    price: "15%",
    total: "20%",
  };

  const OrderDocument = () => (
    <Document>
      {Array.from({ length: totalPages }).map((_, pageIndex) => (
        <Page
          key={pageIndex}
          size="A4"
          style={{
            paddingTop: 10,
            paddingHorizontal: 15,
            paddingBottom: 30,
            fontSize: 10,
          }}
        >
          {/* ===== TITLE ===== */}
          <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 6 }}>
            Order Summary
          </Text>

          {/* ===== CUSTOMER + ORDER INFO ===== */}
          <View style={{ flexDirection: "row", border: "1px solid #000" }}>
            <View style={{ width: "50%", padding: 6, borderRight: "1px solid #000" }}>
              <Text>Name: {order.customer_name || "-"}</Text>
              <Text>Email: {order.email || "-"}</Text>
              <Text>Mobile: {order.mobile || "-"}</Text>
              <Text>Address: {order.address || "-"}</Text>
            </View>
            <View style={{ width: "50%", padding: 6 }}>
              <Text>Order ID: {order.id}</Text>
              <Text>Date: {new Date(order.createdAt).toLocaleDateString()}</Text>
              <Text>Payment: {order.payment_method || "-"}</Text>
              <Text>Status: {order.status || "-"}</Text>
            </View>
          </View>

          {/* ===== TABLE ===== */}
          <View style={{ border: "1px solid #000", marginTop: 10 }}>
            {/* HEADER */}
            <View style={{ flexDirection: "row", borderBottom: "1px solid #000" }}>
              <View style={{ width: columns.sno, padding: 4 }}><Text>No</Text></View>
              <View style={{ width: columns.product, padding: 4 }}><Text>Product</Text></View>
              <View style={{ width: columns.qty, padding: 4 }}><Text>Qty</Text></View>
              <View style={{ width: columns.price, padding: 4 }}><Text>Price</Text></View>
              <View style={{ width: columns.total, padding: 4 }}><Text>Total</Text></View>
            </View>

            {/* ROWS */}
            {orderedItems
              .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
              .map((item: any, idx: number) => (
                <View key={idx} style={{ flexDirection: "row", borderBottom: "1px solid #eee" }}>
                  <View style={{ width: columns.sno, padding: 4 }}>
                    <Text>{idx + 1 + pageIndex * itemsPerPage}</Text>
                  </View>
                  <View style={{ width: columns.product, padding: 4 }}>
                    <Text>{item.Product?.Product_name || "-"}</Text>
                  </View>
                  <View style={{ width: columns.qty, padding: 4 }}>
                  <Text>{getQty(item)}</Text>

                  </View>
                  <View style={{ width: columns.price, padding: 4 }}>
                    <Text>₹{item.price}</Text>
                  </View>
                  <View style={{ width: columns.total, padding: 4 }}>
<Text>₹{item.total ?? item.price * getQty(item)}</Text>
                  </View>
                </View>
              ))}
          </View>

          {/* ===== GRAND TOTAL ===== */}
          {pageIndex === totalPages - 1 && (
            <View style={{ marginTop: 10, alignItems: "flex-end" }}>
              <Text style={{ fontWeight: "bold" }}>
                Grand Total: ₹{netTotal}
              </Text>
            </View>
          )}
        </Page>
      ))}
    </Document>
  );

  const blob = await pdf(<OrderDocument />).toBlob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Admin_Order_${order.id}.pdf`;
  link.click();
};

export default generateAdminOrderPDF;
