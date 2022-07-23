package lk.easycar.service;

import lk.easycar.dto.BookingDTO;

import java.util.List;

public interface BookingService {
    void saveBooking(BookingDTO dto);
    void deleteBooking(String id);
    void updateBooking(BookingDTO dto);
    BookingDTO searchBooking(String id);
    List<BookingDTO> getAllBookings();
    String getNewBookingId();
}
