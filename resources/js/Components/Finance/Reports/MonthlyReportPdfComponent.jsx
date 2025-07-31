import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 5,
        color: '#666666',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 10,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        margin: 'auto',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 10,
    },
    summary: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 5,
    },
    summaryText: {
        fontSize: 12,
        marginBottom: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 10,
        color: '#666666',
    },
});

const MonthlyReportPdfComponent = ({ pdfData }) => {
    const currentDate = new Date().toLocaleDateString();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Monthly Financial Report</Text>
                    <Text style={styles.subtitle}>Month: {pdfData?.month || 'N/A'}</Text>
                    <Text style={styles.subtitle}>Year: {pdfData?.year || new Date().getFullYear()}</Text>
                    <Text style={styles.subtitle}>Generated on: {pdfData?.generatedAt || currentDate}</Text>
                </View>

                {/* Daily Reports Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Daily Reports Summary</Text>

                    {pdfData?.dailyReports && pdfData.dailyReports.length > 0 ? (
                        <View style={styles.table}>
                            {/* Table Header */}
                            <View style={[styles.tableRow, styles.tableHeader]}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Date</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Income</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Expense</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>Balance</Text>
                                </View>
                            </View>

                            {/* Table Rows */}
                            {pdfData.dailyReports.map((report, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{report.date || 'N/A'}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{report.income || '0.00'}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{report.expense || '0.00'}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{report.balance || '0.00'}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text>No daily reports available for this month.</Text>
                    )}
                </View>

                {/* Monthly Summary */}
                <View style={styles.summary}>
                    <Text style={styles.sectionTitle}>Monthly Summary</Text>
                    <Text style={styles.summaryText}>Total Income: {pdfData?.totalIncome || '0.00'}</Text>
                    <Text style={styles.summaryText}>Total Expense: {pdfData?.totalExpense || '0.00'}</Text>
                    <Text style={styles.summaryText}>Net Balance: {pdfData?.netBalance || '0.00'}</Text>
                    <Text style={styles.summaryText}>Total Reports: {pdfData?.totalReports || '0'}</Text>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>This report was automatically generated by the Madrasha Management System</Text>
            </Page>
        </Document>
    );
};

export default MonthlyReportPdfComponent;
