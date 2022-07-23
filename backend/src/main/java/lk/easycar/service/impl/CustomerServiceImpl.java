package lk.easycar.service.impl;

import lk.easycar.dto.BookingDTO;
import lk.easycar.dto.CustomerDTO;
import lk.easycar.entity.Booking;
import lk.easycar.entity.Customer;
import lk.easycar.entity.Driver;
import lk.easycar.repo.BookingRepo;
import lk.easycar.repo.CustomerRepo;
import lk.easycar.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO dto) {
        if (!customerRepo.existsById(dto.getCusID())) {
            customerRepo.save(mapper.map(dto, Customer.class));
        } else {
            throw new RuntimeException("Customer Already Exist..!");
        }
    }

    @Override
    public void deleteCustomer(String id) {
        if (customerRepo.existsById(id)) {
            customerRepo.deleteById(id);
        } else {
            throw new RuntimeException("Please check the Customer ID.. No Such Customer..!");
        }
    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
        if (customerRepo.existsById(dto.getCusID())) {
            customerRepo.save(mapper.map(dto, Customer.class));
        } else {
            throw new RuntimeException("No Such Customer To Update..! Please Check the ID..!");
        }
    }

    @Override
    public CustomerDTO searchCustomer(String id) {
        if (customerRepo.existsById(id)) {
            return mapper.map(customerRepo.findById(id).get(), CustomerDTO.class);
        } else {
            throw new RuntimeException("No Customer For " + id + " ..!");
        }
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return mapper.map(customerRepo.findAll(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }

    @Override
    public List<BookingDTO> getRequestedBookings(String id) {
        if (customerRepo.existsById(id)) {
            List<Booking> bookingList = bookingRepo.findAllByCustomer(customerRepo.findById(id).get());
            return mapper.map(bookingList,
                    new TypeToken<List<BookingDTO>>() {
                    }.getType());
        } else {
            throw new RuntimeException("No Customer For " + id + " ..!");
        }
    }

    @Override
    public String getNewCusID() {
        Customer lastCustomer = customerRepo.getLastCustomer();
        if (lastCustomer!=null){
            int tempId = Integer.parseInt(lastCustomer.getCusID().split("C")[1]);
            tempId = tempId+1;
            if(tempId <= 9){return "C00"+tempId;}
            else if(tempId <= 99){return "C0"+tempId;}
            else {return "C"+tempId;}
        }else{return "C001";}
    }
}
