export default(state = {
    currentPage: "home",
    network: "",
    selectedCryptocurrency: "BTC", // BTC, ETH, LTC
    selectedCryptocurrencyPrice: 0,
    cryptocurrencyPayAmount: 0,
    dollarValuePayAmount: 0,
    productReference: "",
    fiatCurrency: "",
    fiatCurrencySelected: "",
    paymentValidationChecked: false,
    paymentValidationStatus: false,
    paymentCompleted: false,
    paymentDetected: false,
    paymentExpired: false,
    paymentConfirmationEtherscanETH: false,
    paymentConfirmationEthplorerETH: false,
    paymentConfirmationBlockcypherETH: false,
    paymentConfirmationBlocktrailBTC: false,
    paymentConfirmationSochainBTC: false,
    paymentConfirmationBlockcypherBTC: false,
    paymentConfirmationSochainLTC: false,
    paymentConfirmationBlockcypherLTC: false,
    merchantId: '',
    merchantName: '',
    loadingPrices: true,
    priceBTC: 0,
    priceETH: 0,
    priceLTC: 0,
    USDSGD: 0,
    addressBTC: "",
    addressETH: "",
    addressLTC: "", 
    addressTestnetBTC: "",
    addressTestnetETH: "",
    addressTestnetLTC: "",
    selectedCryptocurrencyAddress: "",
    "shippingName": "",
    "shippingEmail": "",
    "shippingMobile": "",
    "shippingCountry": "",
    "shippingAddress": "",
    "shippingPostal": "",
    confirmationBlockNumber: "",
    confirmationTimestamp: "",
    confirmationTransactionHash: "",
    confirmationBlockHash: "",
    confirmationAmount: "",
    transactionData: [],
    generatedTransactionId: "",
    invoiceId: "",
    invoiceData: [],
    invoiceValid: false,
    invoiceFound: false,
    logo: "",
    colorScheme: ""
}, payload) => {
    switch (payload.type) {
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: payload.page
            }
        case 'CHECK_INTERFACE_SCHEME':
            return {
                ...state,
                logo: payload.logo,
                colorScheme: payload.colorScheme
            }
        case 'CLEAR_CHECKED_INVOICE':
            return {
                ...state,
                invoiceFound: false
            }
        case 'BILL_EXPIRE':
            return {
                ...state,
                paymentExpired: true
            }
        case 'CREATE_INVOICE':
            return {
                ...state,
                invoiceId: ""
            }
        case 'INVALID_INVOICE':
            return {
                ...state,
                invoiceValid: false
            }
        case 'INVOICE_CREATED':
            return {
                ...state,
                invoiceId: payload.invoiceId
            }
        case 'UPDATE_INVOICE_DATA':
            return {
                ...state,
                invoiceValid: true,
                invoiceData: payload.invoiceData
            }
        case 'NETWORK_DETECTED':
            return {
                ...state,
                network: payload.network
            }
        case 'DISPLAY_CHECKED_TRANSACTION':
            return {
                ...state,
                invoiceFound: true,
                transactionData: payload.transactionData
            }
        case 'UPDATE_SHIPPING_DETAILS':
            return {
                ...state,
                shippingName: payload.name,
                shippingEmail: payload.email,
                shippingMobile: payload.mobile,
                shippingCountry: payload.country,
                shippingAddress: payload.address,
                shippingPostal: payload.postalCode
            }
        case 'SELECT_CRYPTOCURRENCY':
            var cryptoAddress;
            if(payload.selectedCryptocurrency == "BTC"){
              cryptoAddress = ((payload.network == "testnet") ? state.addressTestnetBTC : state.addressBTC );
            }else if(payload.selectedCryptocurrency == "ETH"){
              cryptoAddress = ((payload.network == "testnet") ? state.addressTestnetETH : state.addressETH );
            }else if(payload.selectedCryptocurrency == "LTC"){
              cryptoAddress = ((payload.network == "testnet") ? state.addressTestnetLTC : state.addressLTC );
            }

            return {
                ...state,
                selectedCryptocurrency: payload.selectedCryptocurrency,
                selectedCryptocurrencyAddress: cryptoAddress,
                cryptocurrencyPayAmount: payload.cryptocurrencyPayAmount
            }
        case 'GET_PRICES':
            return {
                ...state,
                loadingPrices: false,
                priceBTC: payload.priceBTC,
                priceETH: payload.priceETH,
                priceLTC: payload.priceLTC,
                USDSGD: payload.USDSGD
            }
        case 'INITIATE_PAYMENT':
            return {
                ...state,
                paymentDetected: false,
                paymentCompleted: false,
                generatedTransactionId: payload.generatedTransactionId
            }

        case 'GET_PRICES_LOADING':
            return {
                ...state,
                loadingPrices: true
            }
        case 'UPDATE_FIAT_CURRENCY_SELECTED':
            return {
                ...state,
                fiatCurrencySelected: payload.fiatCurrencySelected
            }

        // case 'UPDATE_PAYMENT_PARAMETERS':
        //     return {
        //         ...state,
        //         merchantId: payload.merchantId,
        //         fiatCurrency: payload.fiatCurrency,
        //         fiatCurrencySelected: ((state.fiatCurrencySelected == "") ? payload.fiatCurrency : state.fiatCurrencySelected),
        //         dollarValuePayAmount: payload.dollarValuePayAmount,
        //         productReference: payload.productReference,
        //         merchantName: payload.merchantName,
        //         addressBTC: payload.addressBTC,
        //         addressETH: payload.addressETH,
        //         addressLTC: payload.addressLTC,
        //         paymentValidationStatus: true,
        //         paymentValidationChecked: true
        //     }
        case 'GET_MERCHANT_ADDRESS_SUCCESS':
            return {
                ...state,
                addressBTC: payload.account.addressBTC,
                addressETH: payload.account.addressETH,
                addressLTC: payload.account.addressLTC,
                addressTestnetBTC: payload.account.addressTestnetBTC,
                addressTestnetETH: payload.account.addressTestnetETH,
                addressTestnetLTC: payload.account.addressTestnetLTC
            }

        case 'PAYMENT_PARAMETERS_FAILED':
            return {
                ...state,
                paymentValidationStatus: false,
                paymentValidationChecked: true
            }
        case 'BILL_PAID_ETH_ETHERSCAN':
            var paymentCompletedCheck;
            if(state.paymentConfirmationEthplorerETH){
              paymentCompletedCheck = true;
            }else{
              paymentCompletedCheck = false;
            }

            return {
                ...state,
                paymentConfirmationEtherscanETH: true,
                confirmationBlockNumber: payload.confirmationBlockNumber,
                confirmationTimestamp: payload.confirmationTimestamp,
                confirmationTransactionHash: payload.confirmationTransactionHash,
                confirmationBlockHash: payload.confirmationBlockHash,
                confirmationAmount: payload.confirmationAmount,
                paymentDetected: true,
                paymentCompleted: paymentCompletedCheck
            }
        case 'BILL_PAID_ETH_ETHPLORER':
            var paymentCompletedCheck;
            if(state.paymentConfirmationEtherscanETH){
              paymentCompletedCheck = true;
            }else{
              paymentCompletedCheck = false;
            }

            return {
                ...state,
                paymentConfirmationEthplorerETH: true,
                confirmationBlockNumber: payload.confirmationBlockNumber,
                confirmationTimestamp: payload.confirmationTimestamp,
                confirmationTransactionHash: payload.confirmationTransactionHash,
                confirmationBlockHash: payload.confirmationBlockHash,
                confirmationAmount: payload.confirmationAmount,
                paymentDetected: true,
                paymentCompleted: paymentCompletedCheck
            }
        case 'BILL_PAID_ETH_BLOCKCYPHER':
            var paymentCompletedCheck;
            if(state.paymentConfirmationEthplorerETH && paymentConfirmationEtherscanETH){
              paymentCompletedCheck = true;
            }else{
              paymentCompletedCheck = false;
            }

            return {
                ...state,
                paymentConfirmationBlockcypherETH: true,
                confirmationBlockNumber: payload.confirmationBlockNumber,
                confirmationTimestamp: payload.confirmationTimestamp,
                confirmationTransactionHash: payload.confirmationTransactionHash,
                confirmationBlockHash: payload.confirmationBlockHash,
                confirmationAmount: payload.confirmationAmount,
                paymentDetected: true,
                paymentCompleted: paymentCompletedCheck
            }
        case 'BILL_PAID_BTC_BLOCKTRAIL':
            var paymentCompletedCheck;
            if(state.paymentConfirmationSochainBTC & state.paymentConfirmationBlockcypherBTC){
              paymentCompletedCheck = true;
            }else{
              paymentCompletedCheck = false;
            }

            return {
                ...state,
                paymentConfirmationBlocktrailBTC: true,
                confirmationBlockNumber: payload.confirmationBlockNumber,
                confirmationTimestamp: payload.confirmationTimestamp,
                confirmationTransactionHash: payload.confirmationTransactionHash,
                confirmationBlockHash: payload.confirmationBlockHash,
                confirmationAmount: payload.confirmationAmount,
                paymentDetected: true,
                paymentCompleted: paymentCompletedCheck
            }
        case 'BILL_PAID_BTC_SOCHAIN':
            var paymentCompletedCheck;
            if(state.paymentConfirmationBlocktrailBTC & state.paymentConfirmationBlockcypherBTC){
              paymentCompletedCheck = true;
            }else{
              paymentCompletedCheck = false;
            }

            return {
                ...state,
                paymentConfirmationSochainBTC: true,
                confirmationBlockNumber: payload.confirmationBlockNumber,
                confirmationTimestamp: payload.confirmationTimestamp,
                confirmationTransactionHash: payload.confirmationTransactionHash,
                confirmationBlockHash: payload.confirmationBlockHash,
                confirmationAmount: payload.confirmationAmount,
                paymentDetected: true,
                paymentCompleted: paymentCompletedCheck
            }
        case 'BILL_PAID_BTC_BLOCKCYPHER':
            var paymentCompletedCheck;
            if(state.paymentConfirmationBlocktrailBTC & state.paymentConfirmationSochainBTC){
              paymentCompletedCheck = true;
            }else{
              paymentCompletedCheck = false;
            }

            return {
                ...state,
                paymentConfirmationBlockcypherBTC: true,
                confirmationBlockNumber: payload.confirmationBlockNumber,
                confirmationTimestamp: payload.confirmationTimestamp,
                confirmationTransactionHash: payload.confirmationTransactionHash,
                confirmationBlockHash: payload.confirmationBlockHash,
                confirmationAmount: payload.confirmationAmount,
                paymentDetected: true,
                paymentCompleted: paymentCompletedCheck
            }
        case 'BILL_PAID_LTC_SOCHAIN':
            var paymentCompletedCheck;
            if(state.paymentConfirmationBlockcypherLTC){
              paymentCompletedCheck = true;
            }else{
              paymentCompletedCheck = false;
            }

            return {
                ...state,
                paymentConfirmationSochainLTC: true,
                confirmationBlockNumber: payload.confirmationBlockNumber,
                confirmationTimestamp: payload.confirmationTimestamp,
                confirmationTransactionHash: payload.confirmationTransactionHash,
                confirmationBlockHash: payload.confirmationBlockHash,
                confirmationAmount: payload.confirmationAmount,
                paymentDetected: true,
                paymentCompleted: paymentCompletedCheck
            }
        case 'BILL_PAID_LTC_BLOCKCYPHER':
            var paymentCompletedCheck;
            if(state.paymentConfirmationSochainLTC){
              paymentCompletedCheck = true;
            }else{
              paymentCompletedCheck = false;
            }

            return {
                ...state,
                paymentConfirmationBlockcypherLTC: true,
                confirmationBlockNumber: payload.confirmationBlockNumber,
                confirmationTimestamp: payload.confirmationTimestamp,
                confirmationTransactionHash: payload.confirmationTransactionHash,
                confirmationBlockHash: payload.confirmationBlockHash,
                confirmationAmount: payload.confirmationAmount,
                paymentDetected: true,
                paymentCompleted: paymentCompletedCheck
            }
        case 'SETTLE_ALL_BILLS_BTC':
            return {
                ...state,
                paymentConfirmationBlocktrailBTC: true,
                paymentConfirmationSochainBTC: true,
                paymentConfirmationBlockcypherBTC: true,
                paymentDetected: true,
                paymentCompleted: true
            }
        case 'SETTLE_ALL_BILLS_ETH':
            return {
                ...state,
                paymentConfirmationEtherscanETH: true,
                paymentConfirmationEthplorerETH: true,
                paymentDetected: true,
                paymentCompleted: true
            }
        case 'SETTLE_ALL_BILLS_LTC':
            return {
                ...state,
                paymentConfirmationSochainLTC: true,
                paymentConfirmationBlockcypherLTC: true,
                paymentDetected: true,
                paymentCompleted: true
            }
        case 'UPDATE_SELECTED_CRYPTOCURRENCY_PRICE':
            return {
                ...state,
                selectedCryptocurrencyPrice: payload.selectedCryptocurrencyPrice
            }


        default:
            return state;
    }
};
