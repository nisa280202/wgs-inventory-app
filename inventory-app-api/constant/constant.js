// Kode ini mendefinisikan beberapa konstanta untuk digunakan dalam aplikasi.
// Konstanta SUPER_ADMIN, OFFICE_STAFF, dan WAREHOUSE_STAFF mewakili peran pengguna.
const SUPER_ADMIN = 0
const OFFICE_STAFF = 1
const WAREHOUSE_STAFF = 2

// Konstanta TRANSACTION_IN dan TRANSACTION_OUT digunakan untuk jenis transaksi.
const TRANSACTION_IN = 0
const TRANSACTION_OUT = 1

// Konstanta CREATED, SUCCESS, dan FAILED menunjukkan status dari transaksi.
const CREATED = 0
const SUCCESS = 1
const FAILED = 2

// Ekspor semua konstanta agar dapat digunakan di file atau modul lain.
module.exports = { 
    SUPER_ADMIN, 
    OFFICE_STAFF, 
    WAREHOUSE_STAFF, 
    TRANSACTION_IN, 
    TRANSACTION_OUT, 
    CREATED, 
    SUCCESS, 
    FAILED
}
