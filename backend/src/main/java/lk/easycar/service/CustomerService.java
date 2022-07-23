package lk.easycar.service;

import lk.easycar.dto.BookingDTO;
import lk.easycar.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    void saveCustomer(CustomerDTO entity);
    void deleteCustomer(String id);
    void updateCustomer(CustomerDTO entity);
    CustomerDTO searchCustomer(String id);
    List<CustomerDTO> getAllCustomers();
    List<BookingDTO> getRequestedBookings(String id);
    String getNewCusID();
}
