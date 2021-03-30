package com.pistachio.restservice.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://almond-pistachio-front-end.herokuapp.com")
public class PlayerController {
    @Autowired
    private PlayerRepository playerRepo;

    @PostMapping("/player/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Player add(@RequestBody Player player) {
        return playerRepo.save(player);
    }

    @GetMapping("/player")
    public List<Player> getAll() {
        return playerRepo.findAll();
    }

    @GetMapping(value = "/player/getUser")
    public Player getUser(@RequestParam(value = "user", defaultValue = "") String user) {
        return playerRepo.findById(user).orElse(null);
    }

    @GetMapping(value = "/player/{id}")
    public Player getOne(@PathVariable String id) {
        return playerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException());
    }

    @PutMapping(value = "/player/{id}")
    public Player update(@PathVariable String id, @RequestBody Player updatedPlayer) {
        Player player = playerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        return playerRepo.save(player);
    }

    @DeleteMapping(value = "/player/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete(@PathVariable String id) {
        Player player = playerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        playerRepo.delete(player);
    }

    /**
     * Adds the origin player to the destination player's friend list
     * 
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/requestFriend/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void requestFriend(String Origin, String Destination) {

        Player O = getUser(Origin);

        // Get the destination player
        Player D = getUser(Destination);

        // Execute the request
        D.requestFriendship(O);

        // save the destination player
        update(Destination, D);
    }

    /**
     * Makes the destination player accepts a request from the origin player
     * 
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/acceptFriend/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void acceptFriend(String Origin, String Destination) {
        // Get the origin and destination player
        Player D = getUser(Destination);
        Player O = getUser(Origin);

        // Execute the accpet
        D.acceptFriendship(O);

        // Force add the destination to the origin's list of friends
        O.addFriend(D);

        // Save both players
        update(Destination, D);
        update(Origin, O);
    }

    /**
     * Makes the destination player reject a request from the origin player
     * 
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/rejectFriend/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void rejectFriend(String Origin, String Destination) {
        // get the destination player
        Player D = getUser(Destination);
        Player O = getUser(Origin);

        // Execute the reject
        D.declineFriendship(O);

        // Save the destination player
        update(Destination, D);
    }

    /**
     * Make both players (it doesn't matter the order) stop being friends
     * 
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/removeFriend/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void removeFriend(String Origin, String Destination) {
        // Get the origin and destination player
        Player D = getUser(Destination);
        Player O = getUser(Origin);

        // remove the origin player from the destination player's friend list
        D.removeFriend(O);

        // remove the destination player from the origin player's friend list
        O.removeFriend(D);

        // Save both players
        update(Destination, D);
        update(Origin, O);

    }

}
