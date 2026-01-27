"use client";

import {
  Document,
  Page,
  View,
  Text,
  Image as PDFImage,
  pdf,
} from "@react-pdf/renderer";

const generateOrderSummaryPDF = async ({
  customer,
  orderedItems,
  cart,
  netTotal,
}) => {
  const itemsPerPage = 20;
  const totalPages = Math.ceil(orderedItems.length / itemsPerPage);

  const getPageTotal = (items) =>
    items.reduce((sum, item) => sum + (cart[item.id]?.total || 0), 0);

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
            fontFamily: "Helvetica",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* ================= TITLE ================= */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            Order Summary
          </Text>

          {/* ================= MAIN BOX ================= */}
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* ================= HEADER IMAGE ================= */}
            {pageIndex === 0 && (
              <PDFImage
                src="/pdfheader/headerimage.jpg"
                style={{ width: "100%", height: 80, objectFit: "cover" }}
              />
            )}

            {/* ================= CUSTOMER DETAILS ================= */}
            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: "#000",
                padding: 6,
              }}
            >
              <Text>Name: {customer.name || "-"}</Text>
              <Text>Email: {customer.email || "-"}</Text>
              <Text>Mobile: {customer.mobile || "-"}</Text>
              <Text>Address: {customer.address || "-"}</Text>
            </View>

            {/* ================= ITEMS TABLE ================= */}
            <View
  style={{
    flex: 1,
    position: "relative",
    borderWidth: 1,
    borderColor: "#000",
  }}
>
              {/* ===== COLUMN LINES OVERLAY ===== */}
             <View
  style={{
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    pointerEvents: "none",
    zIndex: 0,
  }}
>
                <View style={{ width: columns.sno, borderRight: "1px solid #000" }} />
                <View style={{ width: columns.product, borderRight: "1px solid #000" }} />
                <View style={{ width: columns.qty, borderRight: "1px solid #000" }} />
                <View style={{ width: columns.price, borderRight: "1px solid #000" }} />
                <View style={{ width: columns.total }} />
              </View>

              {/* ===== TABLE HEADER ===== */}
              <View
                style={{
                  flexDirection: "row",
                  borderBottom: "1px solid #000",
                  fontWeight: "bold",
                  zIndex: 1,
                }}
              >
                <View style={{ width: columns.sno, padding: 4 ,borderRight: "1px solid #000"}}>
                  <Text style={{ textAlign: "center" }}>No</Text>
                </View>
                <View style={{ width: columns.product, padding: 4 ,borderRight: "1px solid #000"}}>
                  <Text>Product</Text>
                </View>
                <View style={{ width: columns.qty, padding: 4,borderRight: "1px solid #000" }}>
                  <Text style={{ textAlign: "center" }}>Qty</Text>
                </View>
                <View style={{ width: columns.price, padding: 4,borderRight: "1px solid #000" }}>
                  <Text style={{ textAlign: "right" }}>Price</Text>
                </View>
                <View style={{ width: columns.total, padding: 4 }}>
                  <Text style={{ textAlign: "right" }}>Amount</Text>
                </View>
              </View>

              {/* ===== TABLE ROWS ===== */}
              <View style={{ zIndex: 1 }}>
                {orderedItems
                  .slice(
                    pageIndex * itemsPerPage,
                    (pageIndex + 1) * itemsPerPage
                  )
                  .map((item, idx) => {
                    const qty = cart[item.id]?.qty || 0;
                    const total = cart[item.id]?.total || 0;

                    return (
                    
                      <View key={idx} style={{ flexDirection: "row" ,borderBottom: "1px solid #ddd"}}>
                        <View style={{ width: columns.sno, padding: 4 }}>
                          <Text style={{ textAlign: "center" }}>
                            {idx + 1 + pageIndex * itemsPerPage}
                          </Text>
                        </View>
                        <View style={{ width: columns.product, padding: 4 }}>
                          <Text>{item.Product_name}</Text>
                        </View>
                        <View style={{ width: columns.qty, padding: 4 }}>
                          <Text style={{ textAlign: "center" }}>{qty}</Text>
                        </View>
                        <View style={{ width: columns.price, padding: 4 }}>
                          <Text style={{ textAlign: "right" }}>
                            ₹{item.Product_price}
                          </Text>
                        </View>
                        <View style={{ width: columns.total, padding: 4}}>
                          <Text style={{ textAlign: "right" }}>₹{total}</Text>
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>

            {/* ================= PAGE TOTAL ================= */}
            {pageIndex < totalPages - 1 && (
              <View
                style={{
                  borderTop: "1px solid #000",
                  padding: 6,
                  alignItems: "flex-end",
                  fontWeight: "bold",
                }}
              >
                <Text>
                  Page Total : ₹
                  {getPageTotal(
                    orderedItems.slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage
                    )
                  )}
                </Text>
              </View>
            )}

            {/* ================= GRAND TOTAL ================= */}
            {pageIndex === totalPages - 1 && (
              <View
                style={{
                  borderTop: "1px solid #000",
                  padding: 6,
                  alignItems: "flex-end",
                  fontWeight: "bold",
                }}
              >
                <Text>Grand Total : ₹{netTotal}</Text>
              </View>
            )}
          </View>

          {/* ================= FOOTER ================= */}
          <View
            fixed
            style={{
              borderTop: "1px solid #000",
              padding: 6,
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: 8,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Text
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
            />
            <Text>Printed By: System</Text>
          </View>
        </Page>
      ))}
    </Document>
  );

  const blob = await pdf(<OrderDocument />).toBlob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Order_Summary_${Date.now()}.pdf`;
  link.click();
};

export default generateOrderSummaryPDF;
