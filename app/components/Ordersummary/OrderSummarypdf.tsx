"use client";

import { Document, Page, View, Text, Image as PDFImage, pdf } from "@react-pdf/renderer";
import Image from "next/image";

const generateOrderSummaryPDF = async ({ customer, orderedItems, cart, netTotal }) => {
  
  const itemsPerPage = 20; // change based on table length per page
  const totalPages = Math.ceil(orderedItems.length / itemsPerPage);

  const OrderDocument = () => (
    <Document>
      {Array.from({ length: totalPages }).map((_, pageIndex) => (
        <Page
          key={pageIndex}
          size="A4"
          style={{
            padding: 20,
            fontFamily: "Helvetica",
            fontSize: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {/* Header */}
         
    <View style={{ alignItems: "center", marginBottom: 10 }}>
  <Text style={{ fontSize: 16, fontWeight: "bold" }}>Order Summary</Text>
</View>

          <View
            style={{
                       borderWidth: 1,
              borderColor: "#000",
            //   padding: 8,
            //   marginBottom: 10,
            height: '80%',
            width: '100%',
            }}>
                 <View style={{ flexDirection: "row", alignItems: "center" , height:"15%",width:"100%"}}>
            {pageIndex === 0 && (
              <PDFImage
                src="/pdfheader/headerimage.jpg" //
                style={{objectFit:"cover"}}
              />
            )}

          </View>

          {/* Customer Details */}
          <View
            style={{
              borderWidth: 1,
              borderColor: "#000",
              // padding: 8,
              // marginBottom: 10,
              height:"10%"
            }}
          >
            <Text>Name: {customer.name || "-"}</Text>
            <Text>Email: {customer.email || "-"}</Text>
            <Text>Address: {customer.address || "-"}</Text>
            <Text>Mobile: {customer.mobile || "-"}</Text>
          </View>

         {/* TABLE HEADER */}
         <view style={{width:"100%", height:"65%",}}>
<View
  style={{
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  }}
>
  <View style={{ width: "5%", borderRightWidth: 1, borderColor: "#000", padding: 4 }}>
    <Text style={{ textAlign: "center" }}>S.No</Text>
  </View>

  <View style={{ width: "45%", borderRightWidth: 1, borderColor: "#000", padding: 4 }}>
    <Text>Product</Text>
  </View>

  <View style={{ width: "15%", borderRightWidth: 1, borderColor: "#000", padding: 4 }}>
    <Text style={{ textAlign: "center" }}>Qty</Text>
  </View>

  <View style={{ width: "15%", borderRightWidth: 1, borderColor: "#000", padding: 4 }}>
    <Text style={{ textAlign: "right" }}>Price</Text>
  </View>

  <View style={{ width: "20%", padding: 4 }}>
    <Text style={{ textAlign: "right" }}>Total</Text>
  </View>
</View>
{orderedItems
  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
  .map((item, idx) => {
    const serialNumber = idx + 1 + pageIndex * itemsPerPage;

    return (
      <View
        key={idx}
        style={{
          flexDirection: "row",
          borderBottomWidth: 0.5,
          borderColor: "#000",
        
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",

    zIndex: 1,
    fontWeight: "bold",
        }}
      >
        {/* S.No */}
        <View style={{ width: "5%", borderRightWidth: 1, borderColor: "#000", padding: 4 }}>
          <Text style={{ textAlign: "center" }}>{serialNumber}</Text>
        </View>

        {/* Product */}
        <View style={{ width: "45%", borderRightWidth: 1, borderColor: "#000", padding: 4 }}>
          <Text>{item.Product_name}</Text>
        </View>

        {/* Qty */}
        <View style={{ width: "15%", borderRightWidth: 1, borderColor: "#000", padding: 4 }}>
          <Text style={{ textAlign: "center" }}>{cart[item.id]?.qty || 0}</Text>
        </View>

        {/* Price */}
        <View style={{ width: "15%", borderRightWidth: 1, borderColor: "#000", padding: 4 }}>
          <Text style={{ textAlign: "right" }}>₹{item.Product_price}</Text>
        </View>

        {/* Total */}
        <View style={{ width: "20%", padding: 4 }}>
          <Text style={{ textAlign: "right" }}>₹{cart[item.id]?.total || 0}</Text>
        </View>
      </View>
    );
  })}
  </view>


          {/* Page-wise total */}
          {pageIndex === totalPages - 1 && (
            <View
              style={{
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: "#000",
                paddingTop: 4,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontWeight: "bold" ,height:"10%",width:"100%"}}>Grand Total: ₹{netTotal}</Text>
            </View>
          )}
          </View>

          {/* Page Number */}
          <Text
            style={{
              position: "absolute",
              bottom: 10,
              right: 20,
              fontSize: 8,
              color: "#555",
            }}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </Page>
      ))}
    </Document>
  );

  // Convert to PDF and download
  const pdfBlob = await pdf(<OrderDocument />).toBlob();
  const url = URL.createObjectURL(pdfBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Order_Summary_${new Date().getTime()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default generateOrderSummaryPDF;
