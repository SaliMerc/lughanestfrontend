import React, { useState, useEffect } from "react";
import DashboardNavigation from './DashboardHeader';


function PaymentTable() {
    const payments = [
        {
            date: "get/expires",
            subscriptionType: "Monthly",
            paymentMethod: "MPESA",
            amount: "Kali Rec",
            receiptNumber: "TZK$gz978",
            status: "Completed",
        },
        {
            date: "get/expires",
            subscriptionType: "Monthly",
            paymentMethod: "MPESA",
            amount: "Kali Rec",
            receiptNumber: "TZK$gz978",
            status: "Failed",
        },
        {
            date: "get/expires",
            subscriptionType: "Monthly",
            paymentMethod: "MPESA",
            amount: "Kali Rec",
            receiptNumber: "TZK$gz978",
            status: "Completed",
        },
        {
            date: "get/expires",
            subscriptionType: "Monthly",
            paymentMethod: "MPESA",
            amount: "Kali Rec",
            receiptNumber: "TZK$gz978",
            status: "Completed",
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(payments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPayments = payments.slice(startIndex, endIndex);

    const handlePrevious = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <DashboardNavigation>

            <div className="p-6 bg-black min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-black border border-[#E3E0C0] rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-black border-b border-[#E3E0C0]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-base font-bold text-white">Date</th>
                                        <th className="px-6 py-4 text-left text-base font-semibold text-white">Subscription Type</th>
                                        <th className="px-6 py-4 text-left text-base font-semibold text-white">Payment Method</th>
                                        <th className="px-6 py-4 text-left text-base font-semibold text-white">Amount</th>
                                        <th className="px-6 py-4 text-left text-base font-semibold text-white">Receipt Number</th>
                                        <th className="px-6 py-4 text-left text-base font-semibold text-white">Payment Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E3E0C0]">
                                    {currentPayments.map((payment, index) => (
                                        <tr key={index} className={index === 2 ? "bg-black" : "bg-black hover:bg-black"}>
                                            <td className="px-6 py-4 text-sm text-white">{payment.date}</td>
                                            <td className="px-6 py-4 text-sm text-white">{payment.subscriptionType}</td>
                                            <td className="px-6 py-4 text-sm text-white">{payment.paymentMethod}</td>
                                            <td className="px-6 py-4 text-sm text-white">{payment.amount}</td>
                                            <td className="px-6 py-4 text-sm text-white">{payment.receiptNumber}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${payment.status.toLowerCase() === 'completed'
                                                        ? ' !text-green-300'
                                                        : ' !text-red-300'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center space-x-2">
                                <div
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 text-sm font-medium rounded-md ${currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    Previous
                                </div>
                                <div
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 text-sm font-medium rounded-md ${currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    Next
                                </div>
                            </div>

                            <div className="text-sm text-black">
                                {currentPage} of {totalPages}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </DashboardNavigation>
    );
};

export default PaymentTable;