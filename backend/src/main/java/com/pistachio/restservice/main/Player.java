package com.pistachio.restservice.main;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;

/**
 * Class that holds all data for a player in the Pistachio game
 * @author igtampe
 */
public class Player {
	
	//-[Fields]--------------------------------------------------------------------------------------------------------
	
	/**
	 * The ID for theDB
	 */
	@Id
	private String _ID;

	/**
	 * The username of this player
	 */
	private String username;
	
	/**
	 * The password of this player.
	 */
	private String password;
	
	/**
	 * Status of this player (Online, Offline, In Battle)
	 */
	private PlayerStatus status = PlayerStatus.Offline;
	
	/**
	 * Collections of monsters this player has
	 */
	private List<Object> collections = new ArrayList<Object>(); //TODO: Switch this to the collections object when complete
	
	/**
	 * List of players who are friends with this player
	 */
	private List<Player> confirmedFriends = new ArrayList<Player>();
	
	/**
	 * List of players who have requested this player's friendship.
	 */
	private List<Player> friendRequests = new ArrayList<Player>();
	
	/**
	 * List of IDs of tasks that this player has completed. Should be cleared when new tasks are made available
	 */
	private List<String> completedTasks = new ArrayList<String>();
	
	/**
	 * List of batles this player is currently in.
	 */
	private List<Battle> battles = new ArrayList<Battle>();
	
	/**
	 * Amount of pistachios the user has
	 */
	private int pistachios=0;
	
	//-[Getters/Setters]--------------------------------------------------------------------------------------------------------

	public String getUsername() {return username;}
	public String getPassword() {return password;}
	public PlayerStatus getStatus() {return status;}
	public List<Object> getCollections() {return collections;}
	public List<String> getCompletedTasks() {return completedTasks;}
	public List<Battle> getBattles() {return battles;}
	public int getPistachios() {return pistachios;}
	public List<Player> getConfirmedFriends(){return confirmedFriends;}
	public List<Player> getFriendRequests(){return friendRequests;}

	public void setPassword(String Pass) {this.password = Pass;}
	public void setConfirmedFriends(List<Player> confirmedFriends) {this.confirmedFriends = confirmedFriends;}
	public void setFriendRequests(List<Player> friendRequests) {this.friendRequests = friendRequests;}
	public void setStatus(PlayerStatus status) {this.status = status;}
	public void setCollections(List<Object> collections) {this.collections = collections;}
	public void setCompletedTasks(List<String> completedTasks) {this.completedTasks = completedTasks;}
	public void setBattles(List<Battle> battles) {this.battles = battles;}
	public void setPistachios(int pistachios) {this.pistachios = pistachios;}
	
	//-[Constructors]--------------------------------------------------------------------------------------------------------

	/**
	 * Creates a player with default values on everything
	 * @param Username
	 */	
	public Player(String username) {this.username=username;}
	
	/**
	 * Creates a player with password for authentication. <b>THIS USER MUST ONLY BE USED FOR AUTHENTICATION</b>
	 * @param Username
	 * @param Password
	 */
	public Player(String username, String password) {
		this.username=username;
		this.password=password;
	}

	/**
	 * Creates a player with all the fields mira que lindo
	 * @param _ID
	 * @param username
	 * @param password
	 * @param status
	 * @param collections
	 * @param confirmedFriends
	 * @param friendRequests
	 * @param completedTasks
	 * @param battles
	 * @param pistachios
	 */
	public Player(String _ID, String username, String password, PlayerStatus status, List<Object> collections,
			List<Player> confirmedFriends, List<Player> friendRequests, List<String> completedTasks,
			List<Battle> battles, int pistachios) {
		super();
		this._ID = _ID;
		this.username = username;
		this.password = password;
		this.status = status;
		this.collections = collections;
		this.confirmedFriends = confirmedFriends;
		this.friendRequests = friendRequests;
		this.completedTasks = completedTasks;
		this.battles = battles;
		this.pistachios = pistachios;
	}
	
	//-[Methods]--------------------------------------------------------------------------------------------------------
	
	/**
	 * Checks that the provided password is the same as this user's password
	 * @param password Password to check
	 * @return True if and only if the password matches the one held in this player
	 */
	public boolean checkPassword(String password) {
		if(this.password==null) {throw new IllegalStateException("This user isn't meant for authentication purposes");}
		return password.contentEquals(this.password);
	}
	
	/**
	 * Clears the password of this user in memory. <b>MUST BE USED BEFORE SENDING PLAYER THROUGH NETWORK</b>
	 */
	public void clearPassword() {password=null;}
	
	/**
	 * Adds given player P to the pending friends list of this player. Player P <b>must not</b> already be a friend OR have sent a request.
	 * @param p Player who is requesting friendship
	 */
	public void requestFriendship(Player p) {
		if(confirmedFriends.contains(p)) {throw new IllegalArgumentException("Player " + p.getUsername() + " is already friends with this player!");}
		if(friendRequests.contains(p)) {throw new IllegalArgumentException("Player " + p.getUsername() + " has already requested frienship.");}
		friendRequests.add(p);
	}

	/**
	 * Accepts friendship request from the given player P (Who <b>must</b> be in the pending friends list). Adds this player to Player P's confirmed friends list
	 * @param p
	 */
	public void acceptFriendship(Player p) {
		if(!friendRequests.contains(p)) {throw new IllegalArgumentException("Player " + p.getUsername() + " is not in the pending friends list");}
		
		friendRequests.remove(p);
		confirmedFriends.add(p);
		p.confirmedFriends.add(this);
	}

	/**
	 * Declines friendship request from the given player P (Who <b>must</b> be in the pending friends list).
	 * @param p
	 */
	public void declineFriendship(Player p) {
		if(!friendRequests.contains(p)) {throw new IllegalArgumentException("Player " + p.getUsername() + " is not in the pending friends list");}
		
		friendRequests.remove(p);
	}
	
	/**
	 * Removes player P from this player's friend list. Player P <b>must</b> be in the confirmed friends list.
	 * @param p
	 */
	public void removeFriend(Player p) {
		if(!confirmedFriends.contains(p)) {throw new IllegalArgumentException("Player " + p.getUsername() + " is not friends with this player");}
		confirmedFriends.remove(p);
		p.confirmedFriends.remove(this);
	}
	
	/**
	 * Adds the specified amount P to the pistachios this player has (can be negative to charge pistacios)
	 * @param p
	 */
	public void addPistachio(int p) { this.pistachios+=p;}
	
	/***
	 * Adds monster M to the default collection of this player
	 * @param m
	 */
	public void addMonster(Monster m) {
		//TODO: actually code this.
	}
	
	/**
	 * Marks provided task t as complete.
	 * @param t
	 */
	public void markTaskComplete(Task t) {
		if(completedTasks.contains(t.get_ID())) {throw new IllegalArgumentException("Player has already completed task " + t.getName());}
		completedTasks.add(t.get_ID());
	}
	
	/**
	 * Checks if task T is in the list of completed tasks. 
	 * @param t
	 */
	public boolean hasTaskCompleted(Task t) {return completedTasks.contains(t.get_ID());}
	
	/**
	 * Clears completed tasks. Should be done once new tasks are available.
	 */
	public void clearCompletedTasks() {completedTasks.clear();}
	
	/**
	 * Adds given battle B to the list of battles this player is in
	 * @param b
	 */
	public void addBattle(Battle b) {battles.add(b);}
	
	/**
	 * Removes given battle B from the list of battles this player is in
	 * @param b
	 */
	public void removeBattle(Battle b) {battles.remove(b);}
	
	/**
	 * Compares this player with another object. Returns true if and only if the other object is a player, and their username is the same as this one's
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {return true;}
		if (!(obj instanceof Player)) {return false;}
		Player other = (Player) obj;
		return username.contentEquals(other.username);
	}
	
	/**
	 * Returns the player's username. For debugging purposes.
	 */
	@Override
	public String toString() {return "Player [Username=" + username + "]";}

	/**
     * @return the _ID
     */
    public String get_ID() {
        return _ID;
    }

    /**
     * @param _ID the _ID to set
     */
    public void set_ID(String _ID) {
        this._ID = _ID;
    }
	
}
