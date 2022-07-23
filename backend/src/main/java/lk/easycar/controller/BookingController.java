package lk.easycar.controller;

import lk.easycar.dto.BookingDTO;
import lk.easycar.service.BookingService;
import lk.easycar.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("booking")
@CrossOrigin
public class BookingController {

    @Autowired
    BookingService bookingService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllBookings(){
        return new ResponseUtil(200,"Ok",bookingService.getAllBookings());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil createBooking(@RequestBody BookingDTO bookingDTO) {
        bookingService.saveBooking(bookingDTO);
        return new ResponseUtil(200, "Save", null);
    }

    //booking/new
    @GetMapping(path = "new",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getNewId() {
        return new ResponseUtil(200,"Ok",bookingService.getNewBookingId());
    }
}
