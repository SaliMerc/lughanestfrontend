import React, { useState, useEffect } from "react";
import DashboardNavigation from './DashboardHeader';
import { handleViewTransactions } from '../utils/paymentUtils';

import { capitalizeFirst } from '../utils/slugUtils';
import { exportToCSV } from '../utils/exportUtils';

import SearchBar from '../components/SearchBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';


function PaymentTable() {
    const [payments, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                await handleViewTransactions(
                    {},
                    (response) => {
                        if (response.data) {
                            setTransactions(response.data.data);
                        } else {
                            setTransactions([]);
                        }
                    },
                    (error) => {
                        setError(error.message || 'Failed to fetch transaction records');
                    }
                );
            } catch (err) {
                setError(err.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredPayments = searchTerm.trim() === ''
        ? payments
        : payments.filter(item =>
            item?.transaction_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.trasaction_status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.subscription_type?.toLowerCase().includes(searchTerm.toLowerCase())||
            item?.subscription_status?.toLowerCase().includes(searchTerm.toLowerCase())||
            item?.transaction_method?.toLowerCase().includes(searchTerm.toLowerCase())
        );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const mypayments = filteredPayments.slice(startIndex, endIndex);

    const handlePrevious = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <DashboardNavigation>

            <div className="px-6 bg-black min-h-screen">

                <div className="min-w-6xl mx-auto">
                    <h1 className='text-2xl md:text-4xl font-semibold mb-7'>My Payment History </h1>
                    <div className="flex flex-row justify-between mb-3">
                        <div className="flex-grow">
                            <SearchBar
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search receipt number, status, or subscription type..."
                            />
                        </div>

                        <div
                            onClick={() => exportToCSV(payments, 'payments.csv')}
                            className="cursor-pointer flex items-center gap-2 text-white  font-semibold underline "
                        >
                            <FontAwesomeIcon icon={faDownload} />
                            <span>Export CSV</span>
                        </div>
                    </div>

                    <div className="bg-black border border-[#E3E0C0] rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-black border-b border-[#E3E0C0]">
                                    <tr>
                                        <th className="px-6 py-4 text-left border-r text-base font-bold text-white">No.</th>
                                        <th className="px-6 py-4 text-left text-base font-semibold text-white">Subscription Type</th>
                                        <th className="px-6 py-4 text-left text-base font-bold text-white border-r ">Subscription Date</th>
                                        <th className="px-6 py-4 text-left text-base font-bold text-white">Start Date</th>
                                        <th className="px-6 py-4 text-left text-base font-bold text-white">End Date</th>
                                        <th className="px-6 py-4 text-left text-base font-bold text-white border-r ">Subscription Status</th>

                                        <th className="px-6 py-4 text-left border-r text-base font-semibold text-white">Transaction Method</th>
                                        <th className="px-6 py-4 text-left text-base font-semibold text-white">Amount</th>
                                        <th className="px-6 py-4 text-left text-base font-semibold text-white">Transaction Code</th>
                                        <th className="px-6 py-4 text-left text-base font-semibold text-white">Transaction Status</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                     {loading ? (

              <div className="w-full text-center py-10">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
              </div>

            ) : mypayments.length === 0 ? (

              <div className="w-full text-center py-10">
                <p>You have not made any transaction.</p>
              </div>
            ) : ( mypayments.map((payment, index) => (
                                    <tr key={index} className="odd:bg-[#OE0D0E] even:bg-[#0E0D0C]">
                                        <td className="px-6 py-4 border-r text-sm text-white">{startIndex + index + 1}</td>
                                        <td className="px-6 py-4 text-sm text-white ">{payment.subscription_type || 'None'}</td>
                                        <td className="px-6 py-4 text-sm text-white border-r">  {payment.subscription_date
                                            ? new Date(payment.subscription_date).toLocaleDateString('en-GB')
                                            : 'N/A'}

                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">  {payment.subscription_start_date
                                            ? new Date(payment.subscription_start_date).toLocaleDateString('en-GB')
                                            : 'N/A'}

                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {payment.subscription_end_date
                                                ? new Date(payment.subscription_end_date).toLocaleDateString('en-GB')
                                                : 'N/A'}

                                        </td>
                                        <td className="px-6 py-4 border-r text-sm text-white">{payment.subscription_status}</td>

                                        <td className="px-6 py-4 border-r text-sm text-white">{payment.transaction_method}</td>
                                        <td className="px-6 py-4 text-sm text-white">{payment.transaction_amount}</td>
                                        <td className="px-6 py-4 text-sm text-white">{payment.transaction_code || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${payment.transaction_status.toLowerCase() === 'completed'
                                                ? ' !text-[#000000] font-bold  bg-[#16f037]'
                                                : ' !text-[#000000] bg-red-500'
                                                }`}>
                                                {payment.transaction_status}
                                            </span>
                                        </td>
                                    </tr>
                                    ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-[#0E0D0C]">
                            <div className="flex items-center space-x-2">
                                <div
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                    className={`px-3 min-w-20 py-1 cursor-pointer items-center justify-center text-sm font-medium rounded-md ${currentPage === 1
                                        ? 'bg-[#0E0D0C] text-white hidden'
                                        : 'bg-[#0E0D0C] text-white border'
                                        }`}
                                >
                                    Previous
                                </div>
                                <div
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 min-w-20 py-1 cursor-pointer text-sm font-medium rounded-md ${currentPage === totalPages
                                        ? 'bg-[#0E0D0C] text-white hidden'
                                        : 'bg-[#0E0D0C] text-white border'
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