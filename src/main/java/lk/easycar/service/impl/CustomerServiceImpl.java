package lk.easycar.service.impl;

import lk.easycar.dto.CustomerDTO;
import lk.easycar.entity.Customer;
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
    private CustomerRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO dto) {
        if (!repo.existsById(dto.getCusID())) {
            repo.save(mapper.map(dto, Customer.class));
        } else {
            throw new RuntimeException("Customer Already Exist..!");
        }
    }

    @Override
    public void deleteCustomer(String id) {
        if (repo.existsById(id)){
            repo.deleteById(id);
        }else{
            throw new RuntimeException("Please check the Customer ID.. No Such Customer..!");
        }
    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
        if (repo.existsById(dto.getCusID())) {
            repo.save(mapper.map(dto, Customer.class));
        } else {
            throw new RuntimeException("No Such Customer To Update..! Please Check the ID..!");
        }
    }

    @Override
    public CustomerDTO searchCustomer(String id) {
        if (repo.existsById(id)){
            return mapper.map(repo.findById(id).get(), CustomerDTO.class);
        }else{
            throw new RuntimeException("No Customer For "+id+" ..!");
        }
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return mapper.map(repo.findAll(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }
}