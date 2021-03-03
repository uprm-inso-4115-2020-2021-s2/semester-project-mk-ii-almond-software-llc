package com.pistachio.main;

import java.util.ArrayList;
import java.util.List;

/**
 * Class that holds all data for a player in the Pistachio game
 * @author igtampe
 */
public class Player {
	
	//-[Fields]--------------------------------------------------------------------------------------------------------
	
	/**
	 * The username of this player
	 */
	private String Username;
	
	/**
	 * The password of this player.
	 */
	private String Password;
	
	/**
	 * Status of this player (Online, Offline, In Battle)
	 */
	private PlayerStatus Status = PlayerStatus.Offline;
	
	/**
	 * Collections of monsters this player has
	 */
	private List<Object> Collections = new ArrayList<Object>(); //TODO: Switch this to the collections object when complete
	
	/**
	 * List of players who are friends with this player
	 */
	private List<Player> ConfirmedFriends = new ArrayList<Player>();
	
	/**
	 * List of players who have requested this player's friendship.
	 */
	private List<Player> FriendRequests = new ArrayList<Player>();
	
	/**
	 * List of IDs of tasks that this player has completed. Should be cleared when new tasks are made available
	 */
	private List<String> CompletedTasks = new ArrayList<String>();
	
	/**
	 * List of batles this player is currently in.
	 */
	private List<Object> Battles = new ArrayList<Object>(); //TODO: Switch this to the Battle object when complete
	
	/**
	 * Amount of pistachios the user has
	 */
	private int Pistachios=0;
	
	//-[Getters/Setters]--------------------------------------------------------------------------------------------------------

	public String getUsername() {return Username;}
	public String getPassword() {return Password;}
	public PlayerStatus getStatus() {return Status;}
	public List<Object> getCollections() {return Collections;}
	public List<String> getCompletedTasks() {return CompletedTasks;}
	public List<Object> getBattles() {return Battles;}
	public int getPistachios() {return Pistachios;}
	public List<Player> getConfirmedFriends(){return ConfirmedFriends;}
	public List<Player> getFriendRequests(){return FriendRequests;}

	public String setPassword() {return Password;}
	public void setConfirmedFriends(List<Player> confirmedFriends) {ConfirmedFriends = confirmedFriends;}
	public void setFriendRequests(List<Player> friendRequests) {FriendRequests = friendRequests;}
	public void setStatus(PlayerStatus status) {Status = status;}
	public void setCollections(List<Object> collections) {Collections = collections;}
	public void setCompletedTasks(List<String> completedTasks) {CompletedTasks = completedTasks;}
	public void setBattles(List<Object> battles) {Battles = battles;}
	public void setPistachios(int pistachios) {Pistachios = pistachios;}
	
	//-[Constructors]--------------------------------------------------------------------------------------------------------

	/**
	 * Creates a player with default values on everything
	 * @param Username
	 */	
	public Player(String Username) {this.Username=Username;}
	
	/**
	 * Creates a player with password for authentication. <b>THIS USER MUST ONLY BE USED FOR AUTHENTICATION</b>
	 * @param Username
	 * @param Password
	 */
	public Player(String Username, String Password) {
		this.Username=Username;
		this.Password=Password;
	}

	//-[Methods]--------------------------------------------------------------------------------------------------------
	
	/**
	 * Checks that the provided password is the same as this user's password
	 * @param Password Password to check
	 * @return True if and only if the password matches the one held in this player
	 */
	public boolean checkPassword(String Password) {
		if(this.Password==null) {throw new IllegalStateException("This user isn't meant for authentication purposes");}
		return Password.contentEquals(this.Password);
	}
	
	/**
	 * Clears the password of this user in memory. <b>MUST BE USED BEFORE SENDING PLAYER THROUGH NETWORK</b>
	 */
	public void ClearPassword() {Password=null;}
	
	/**
	 * Adds given player P to the pending friends list of this player. Player P <b>must not</b> already be a friend OR have sent a request.
	 * @param P Player who is requesting friendship
	 */
	public void requestFriendhip(Player P) {
		if(ConfirmedFriends.contains(P)) {throw new IllegalArgumentException("Player " + P.getUsername() + " is already friends with this player!");}
		if(FriendRequests.contains(P)) {throw new IllegalArgumentException("Player " + P.getUsername() + " has already requested frienship.");}
		FriendRequests.add(P);
	}

	/**
	 * Accepts friendship request from the given player P (Who <b>must</b> be in the pending friends list). Adds this player to Player P's confirmed friends list
	 * @param P
	 */
	public void acceptFriendship(Player P) {
		if(!FriendRequests.contains(P)) {throw new IllegalArgumentException("Player " + P.getUsername() + " is not in the pending friends list");}
		
		FriendRequests.remove(P);
		ConfirmedFriends.add(P);
		P.ConfirmedFriends.add(this);
	}

	/**
	 * Declines friendship request from the given player P (Who <b>must</b> be in the pending friends list).
	 * @param P
	 */
	public void declineFriendship(Player P) {
		if(!FriendRequests.contains(P)) {throw new IllegalArgumentException("Player " + P.getUsername() + " is not in the pending friends list");}
		
		FriendRequests.remove(P);
	}
	
	/**
	 * Removes player P from this player's friend list. Player P <b>must</b> be in the confirmed friends list.
	 * @param P
	 */
	public void RemoveFriend(Player P) {
		if(!ConfirmedFriends.contains(P)) {throw new IllegalArgumentException("Player " + P.getUsername() + " is not friends with this player");}
		ConfirmedFriends.remove(P);
		P.ConfirmedFriends.remove(this);
	}
	
	/**
	 * Adds the specified amount P to the pistachios this player has (can be negative to charge pistacios)
	 * @param P
	 */
	public void addPistachio(int P) { this.Pistachios+=P;}
	
	/***
	 * Adds monster M to the default collection of this player
	 * @param M
	 */
	public void addMonster(Object M) {
		//TODO: actually code this.
	}
	
	/**
	 * Marks provided task t as complete.
	 * @param T
	 */
	public void markTaskComplete(Object T) {
		
		//TODO: Uncomment the following line:
		//CompletedTasks.add(T.ID);
	}
	
	/**
	 * Checks if task T is in the list of completed tasks. 
	 * @param T
	 */
	public boolean hasTaskCompleted(Object T) {
		
		//TODO: Uncomment the following line and remove the line after that.
		//return CompletedTasks.contains(T.ID)
		return false;
	}
	
	/**
	 * Clears completed tasks. Should be done once new tasks are available.
	 */
	public void clearCompletedTasks() {CompletedTasks.clear();		}
	
	/**
	 * Adds given battle B to the list of battles this player is in
	 * @param B
	 */
	public void AddBattle(Object B) {Battles.add(B);}
	
	/**
	 * Removes given battle B from the list of battles this player is in
	 * @param B
	 */
	public void RemoveBattle(Object B) {Battles.remove(B);}
	
	/**
	 * Compares this player with another object. Returns true if and only if the other object is a player, and their username is the same as this one's
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {return true;}
		if (!(obj instanceof Player)) {return false;}
		Player other = (Player) obj;
		return Username.contentEquals(other.Username);
	}
	
	/**
	 * Returns the player's username. For debugging purposes.
	 */
	@Override
	public String toString() {return "Player [Username=" + Username + "]";}
	
}
