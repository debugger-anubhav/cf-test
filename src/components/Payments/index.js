// import React, {useEffect, useState} from "react";
// import styles from "./styles.module.css";
// import DocSidebar from "../Documentation/Sidebar/DocSidebar";
// import Invoices from "./invoices";
// import Payment from "./payments";
// import CreditNotes from "./creditNotes";
// import Refunds from "./refunds";
// import RetainerInvoice from "./retainerInvoice/index";
// import axios from "axios";
// import {baseURL} from "@/network/axios";
// import {endPoints} from "@/network/endPoints";
// import {decrypt} from "@/hooks/cryptoUtils";
// import {getLocalStorage} from "@/constants/constant";
// import {Skeleton} from "@mui/material";
// // import html2pdf from "html2pdf.js";

// const PaymentPage = () => {
//   const userId = decrypt(getLocalStorage("_ga"));
//   // const userId = 85777;

//   const [paymentDetails, setPaymentDetails] = useState();
//   const [loadingSkeleton, setLoadingSkeleton] = useState(true);

//   const fetchMyPayments = () => {
//     axios
//       .get(baseURL + endPoints.myPaymentsPage.getMyPayments(userId))
//       .then(res => {
//         console.log(res?.data?.data);
//         setPaymentDetails(res?.data?.data);
//         setLoadingSkeleton(false);
//       })
//       .catch(err => {
//         console.log(err);
//         setLoadingSkeleton(false);
//       });
//   };
//   // const generatePdf = htmlContent => {
//   //   if (typeof window !== "undefined") {

//   //     const opt = {
//   //       margin: 1,
//   //       filename: "invoice.pdf",
//   //       image: {type: "jpeg", quality: 0.98},
//   //       html2canvas: {scale: 2},
//   //       jsPDF: {unit: "in", format: "letter", orientation: "portrait"},
//   //     };

//   //     html2pdf().from(htmlContent).set(opt).save();
//   //   }
//   // };

//   const downloadAPI = () => {
//     axios
//       .post(
//         baseURL + endPoints.downloadPDF,
//         {
//           statement_format: "pdf",
//         },
//         {
//           headers: {
//             userid: userId,
//           },
//         },
//       )
//       .then(res => {
//         console.log(res?.data?.htmlData);
//         // generatePdf(res?.data?.htmlData);
//       })
//       .catch(err => console.log(err));
//   };

//   const handleDownload = () => {
//     downloadAPI();
//   };
//   useEffect(() => {
//     fetchMyPayments();
//   }, []);

//   return (
//     <div className={styles.main_container}>
//       <div className={styles.doc_side_bar} style={{height: "initial"}}>
//         <DocSidebar isOverviewSelected={true} />
//       </div>
//       <div className={styles.right_div}>
//         <h1 className={styles.header}>My Payments</h1>
//         <p className={` mt-6 xl:mt-8 ${styles.desc}`}>
//           Access your complete payment history on one page. Additionally, you
//           have the option to download statement for offline use, providing
//           flexibility in monitoring your financial records.
//         </p>

//         <div className={styles.amount_wrapper}>
//           <p className={styles.desc}>
//             Total invoices: <span className={styles.rupeeIcon}>₹</span>
//             {!loadingSkeleton ? (
//               paymentDetails?.toBePaid
//             ) : (
//               <Skeleton variant="text" width={40} className="ml-1" />
//             )}
//           </p>
//           <p className={styles.desc}>
//             Total payment: <span className={styles.rupeeIcon}>₹</span>
//             {!loadingSkeleton ? (
//               paymentDetails?.toBePaid - paymentDetails?.balance
//             ) : (
//               <Skeleton variant="text" width={40} className="ml-1" />
//             )}
//           </p>
//           <p className={styles.desc}>
//             Balance: <span className={styles.rupeeIcon}>₹</span>
//             {!loadingSkeleton ? (
//               paymentDetails?.balance
//             ) : (
//               <Skeleton variant="text" width={40} className="ml-1" />
//             )}
//           </p>
//           <button
//             className={`${styles.pay_all_btn} ${
//               loadingSkeleton ? "!bg-[#FFDF85] !cursor-not-allowed" : ""
//             }`}
//             onClick={() => handleDownload()}
//             disabled={loadingSkeleton}>
//             Download statement
//           </button>
//         </div>

//         <div>
//           <Invoices
//             rows={paymentDetails?.invoices}
//             loadingSkeleton={loadingSkeleton}
//           />
//           <Payment
//             rows={paymentDetails?.payments?.sort(
//               (a, b) => new Date(b.created_time) - new Date(a.created_time),
//             )}
//             loadingSkeleton={loadingSkeleton}
//           />
//           <CreditNotes rows={paymentDetails?.creditNotes} />
//           {paymentDetails?.retainer && (
//             <RetainerInvoice rows={paymentDetails?.retainer} />
//           )}
//           {paymentDetails?.refund && <Refunds rows={paymentDetails.refund} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import Invoices from "./invoices";
import Payment from "./payments";
import CreditNotes from "./creditNotes";
import Refunds from "./refunds";
import RetainerInvoice from "./retainerInvoice/index";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import {Skeleton} from "@mui/material";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";

const PaymentPage = () => {
  const userId = decrypt(getLocalStorage("_ga"));

  const [paymentDetails, setPaymentDetails] = useState();
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const fetchMyPayments = () => {
    axios
      .get(baseURL + endPoints.myPaymentsPage.getMyPayments(userId))
      .then(res => {
        console.log(res?.data?.data);
        setPaymentDetails(res?.data?.data);
        setLoadingSkeleton(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingSkeleton(false);
      });
  };
  const downloadAPI = () => {
    axios
      .post(
        baseURL + endPoints.downloadPDF,
        {
          statement_format: "pdf",
        },
        {
          headers: {
            userid: userId,
          },
        },
      )
      .then(res => {
        console.log(res?.data?.htmlData);
        htmlStringToPdf(res?.data?.htmlData);
      })
      .catch(err => console.log(err));
  };

  const handleDownload = () => {
    downloadAPI();
  };
  useEffect(() => {
    fetchMyPayments();
  }, []);
  const htmlStringToPdf = async htmlString => {
    try {
      const iframe = document.createElement("iframe");
      iframe.style.visibility = "hidden";
      document.body.appendChild(iframe);
      const iframedoc = iframe.contentDocument || iframe.contentWindow.document;
      iframedoc.body.innerHTML = htmlString;

      // Increase canvas resolution
      const canvas = await html2canvas(iframedoc.body, {scale: 2.5}); // Adjust scale as needed
      const imgData = canvas.toDataURL("image/png");
      const doc = new JsPDF({
        format: "a4",
        unit: "mm",
      });
      doc.addImage(imgData, "PNG", 0, 0, 210, 297);
      const pdfBlob = doc.output("blob");
      document.body.removeChild(iframe);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "payment_statement.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar} style={{height: "initial"}}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <h1 className={styles.header}>My Payments</h1>
        <p className={` mt-6 xl:mt-8 ${styles.desc}`}>
          Access your complete payment history on one page. Additionally, you
          have the option to download statement for offline use, providing
          flexibility in monitoring your financial records.
        </p>

        <div className={styles.amount_wrapper}>
          <p className={styles.desc}>
            Total invoices: <span className={styles.rupeeIcon}>₹</span>
            {!loadingSkeleton ? (
              paymentDetails?.toBePaid
            ) : (
              <Skeleton variant="text" width={40} className="ml-1" />
            )}
          </p>
          <p className={styles.desc}>
            Total payment: <span className={styles.rupeeIcon}>₹</span>
            {!loadingSkeleton ? (
              paymentDetails?.toBePaid - paymentDetails?.balance
            ) : (
              <Skeleton variant="text" width={40} className="ml-1" />
            )}
          </p>
          <p className={styles.desc}>
            Balance: <span className={styles.rupeeIcon}>₹</span>
            {!loadingSkeleton ? (
              paymentDetails?.balance
            ) : (
              <Skeleton variant="text" width={40} className="ml-1" />
            )}
          </p>
          <button
            className={`${styles.pay_all_btn} ${
              loadingSkeleton ? "!bg-[#FFDF85] !cursor-not-allowed" : ""
            }`}
            onClick={() => handleDownload()}
            disabled={loadingSkeleton}>
            Download statement
          </button>
        </div>

        <div>
          <Invoices
            rows={paymentDetails?.invoices}
            loadingSkeleton={loadingSkeleton}
          />
          <Payment
            rows={paymentDetails?.payments?.sort(
              (a, b) => new Date(b.created_time) - new Date(a.created_time),
            )}
            loadingSkeleton={loadingSkeleton}
          />
          <CreditNotes rows={paymentDetails?.creditNotes} />
          {paymentDetails?.retainer && (
            <RetainerInvoice rows={paymentDetails?.retainer} />
          )}
          {paymentDetails?.refund && <Refunds rows={paymentDetails.refund} />}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

// const htmlStringToPdf = async htmlString => {
//   try {
//     const iframe = document.createElement("iframe");
//     iframe.style.visibility = "hidden";
//     document.body.appendChild(iframe);
//     const iframedoc = iframe.contentDocument || iframe.contentWindow.document;
//     iframedoc.body.innerHTML = htmlString;

//     const canvas = await html2canvas(iframedoc.body, {});
//     const imgData = canvas.toDataURL("image/png");
//     const doc = new JsPDF({
//       format: "a4",
//       unit: "mm",
//     });

//     const scaleFactor = 210 / canvas.width;
//     const imgWidth = canvas.width * scaleFactor;
//     const imgHeight = canvas.height * scaleFactor;

//     doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//     const pdfBlob = doc.output("blob");
//     document.body.removeChild(iframe);

//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(pdfBlob);
//     link.download = "payment_statement.pdf";
//     link.click();
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//   }
// };
