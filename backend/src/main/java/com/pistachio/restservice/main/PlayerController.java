package com.pistachio.restservice.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/player/username")
    public List<String> getAllUsernames() {
        List<Player> allPlayers = playerRepo.findAll();
        List<String> allUsernames = new ArrayList<String>();
        for (Player player : allPlayers) {
            allUsernames.add(player.getUser());
        }
        return allUsernames;
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

        player.setBattleID(updatedPlayer.getBattleID());
        player.setBattles(updatedPlayer.getBattles());
        player.setCollections(updatedPlayer.getCollections());
        player.setCompletedTasks(updatedPlayer.getCompletedTasks());
        player.setConfirmedFriends(updatedPlayer.getConfirmedFriends());
        player.setFriendRequests(updatedPlayer.getFriendRequests());
        player.setPistachios(updatedPlayer.getPistachios());
        player.setStatus(updatedPlayer.getStatus());
        player.setTeam(updatedPlayer.getTeam());

        return playerRepo.save(player);
    }

    @DeleteMapping(value = "/player/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void delete(@PathVariable String id) {
        Player player = playerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        playerRepo.delete(player);
    }

    // Get the list of friends from the player
    @GetMapping(value = "/player/friendList")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public List<String> getFriends(@RequestParam(value = "user", defaultValue = "") String user) {
        return getUser(user).getConfirmedFriends();
    }

    // Get the list of friends from the player
    @GetMapping(value = "/player/requestFriendList")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public List<String> getRequestFriendList(@RequestParam(value = "user", defaultValue = "") String user) {
        return getUser(user).getFriendRequests();
    }

    /**
     * Adds the origin player to the destination player's friend list
     * 
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/requestFriend/{Origin}/{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void requestFriend(@PathVariable String Origin, @PathVariable String Destination) {

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
    @PutMapping(value = "/player/acceptFriend/{Origin}/{Destination}/yes")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void acceptFriend(@PathVariable String Origin, @PathVariable String Destination) {
        // Get the origin and destination player
        Player playerThatRequested = getUser(Destination);
        Player playerThatAccepted = getUser(Origin);

        if (playerThatAccepted.acceptFriendship(playerThatRequested, false)) {
            playerThatRequested.addFriend(playerThatAccepted);
        }

        // Save both players into db regardless of wether friendship was accepted or not
        this.update(playerThatRequested.getUser(), playerThatRequested);
        this.update(playerThatAccepted.getUser(), playerThatAccepted);
    }

    /**
     * Makes the destination player accepts a request from the origin player
     * 
     * @param Origin
     * @param Destination
     */
    @PutMapping(value = "/player/rejectFriend/{Origin}/{Destination}/no")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void rejectFriend(@PathVariable String Origin, @PathVariable String Destination) {
        // Get the origin and destination player
        Player playerThatRequested = getUser(Destination);
        Player playerThatRejected = getUser(Origin);

        if (playerThatRejected.acceptFriendship(playerThatRequested, true)) {
            playerThatRequested.addFriend(playerThatRejected);
        }

        // Save both players into db regardless of wether friendship was accepted or not
        this.update(playerThatRequested.getUser(), playerThatRequested);
        this.update(playerThatRejected.getUser(), playerThatRejected);
    }

    /**
     * Make both players (it doesn't matter the order) stop being friends
     * 
     * @param Origin
     * @param Destination
     */
    @PutMapping(value = "/player/removeFriend/{Origin}/{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void removeFriend(@PathVariable String Origin, @PathVariable String Destination) {
        // Get the origin and destination player
        Player D = getUser(Destination);
        Player O = getUser(Origin);

        // remove the origin player from the destination player's friend list
        D.removeFriend(O);

        // Save both players
        update(Destination, D);
        update(Origin, O);

    }

}
