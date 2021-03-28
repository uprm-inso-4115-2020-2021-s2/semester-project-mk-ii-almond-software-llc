package com.pistachio.restservice.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/player/userExists")
    public Player userExists(@RequestParam(value = "user", defaultValue = "") String user) {

        List<Player> players = playerRepo.findAll();

        for(Player p : players){
            if(p.getUser().equalsIgnoreCase(user))
                return p;   
        }

        return null;

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
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/requestFriend/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void requestFriend(String Origin, String Destination) {
    
    	//Get the destination player
    	Player D=getOne(Destination); 
    	
    	//Execute the request
    	D.requestFriendship(Origin); 
    	
    	//save the destination player
    	update(Destination, D);
    }
    
    /**
     * Makes the destination player accepts a request from the origin player
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/acceptFriend/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void acceptFriend(String Origin, String Destination) {
    	//Get the origin and destination player
    	Player D=getOne(Destination);
    	Player O=getOne(Origin);
    			
    	//Execute the accpet
    	D.acceptFriendship(Origin);
    	
    	//Forceadd the destination to the origin's list of friends
    	O.addFriend(Destination);
    	
		//Save both players
    	update(Destination, D);
    	update(Origin,O);
    }
    
    /**
     * Makes the destination player reject a request from the origin player
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/rejectFriend/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void rejectFriend(String Origin, String Destination) {
    	//get the destination player
    	Player D=getOne(Destination);
    	
    	//Execute the reject
    	D.declineFriendship(Origin);
    	
    	//Save the destination player
    	update(Destination, D);
    }
    
    /**
     * Make both players (it doesn't matter the order) stop being friends
     * @param Origin
     * @param Destination
     */
    @GetMapping(value = "/player/removeFriend/{Origin}-{Destination}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void removeFriend(String Origin, String Destination) {
    	//Get the origin and destination player
    	Player D=getOne(Destination);
    	Player O=getOne(Origin);
    	
    	//remove the origin player from the destination player's friend list
    	D.removeFriend(Origin);
    	
    	//remove the destination player from the origin player's friend list
    	O.removeFriend(Destination);
    	
    	//Save both players
    	update(Destination, D);
    	update(Origin,O);
    	
    }
    
}
