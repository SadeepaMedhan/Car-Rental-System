package lk.easycar.controller;

import lk.easycar.dto.CustomerDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("customer")
public class CustomerController {

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CustomerDTO getAllCustomers(){
        return new CustomerDTO("C001","Kamal","kamal@gmail.com","kamal123","4581513V","8331874","Matara","0712345678");
    }
}
