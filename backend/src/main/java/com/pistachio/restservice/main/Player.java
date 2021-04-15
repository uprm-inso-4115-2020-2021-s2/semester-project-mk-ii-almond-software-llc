package com.pistachio.restservice.main;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;

/**
 * Class that holds all data for a player in the Pistachio game
 * 
 * @author igtampe
 */
public class Player {

	// -[Fields]--------------------------------------------------------------------------------------------------------

	/**
	 * The user of this player
	 */
	@Id
	private String user;

	/**
	 * The pass of this player.
	 */
	private String pass;

	/**
	 * Status of this player (Online, Offline, In Battle)
	 */
	private PlayerStatus status = PlayerStatus.Offline;

	/**
	 * Collections of monsters this player has
	 */
	private List<String> collections = new ArrayList<String>(); // TODO: Switch this to the collections object when
																// complete

	/**
	 * Collections of monsters this player will battle with
	 */
	private List<String> team = new ArrayList<String>();

	/**
	 * List of player usernames who are friends with this player
	 */
	private List<String> confirmedFriends = new ArrayList<String>();

	/**
	 * List of players who have requested this player's friendship.
	 */
	private List<String> friendRequests = new ArrayList<String>();

	/**
	 * List of IDs of tasks that this player has completed. Should be cleared when
	 * new tasks are made available
	 */
	private List<String> completedTasks = new ArrayList<String>();

	/**
	 * List of batles this player is currently in.
	 */
	private List<Battle> battles = new ArrayList<Battle>();

	/**
	 * Amount of pistachios the user has
	 */
	private int pistachios = 0;

	/**
	 * ID of the battle this player is in. If the ID is blank, null, or empty, then
	 * this player isn't in battle
	 */
	private String battleID = "";

	// -[Getters/Setters]--------------------------------------------------------------------------------------------------------

	public String getUser() {
		return this.user;
	}

	public String getPass() {
		return this.pass;
	}

	public PlayerStatus getStatus() {
		return status;
	}

	public List<String> getCollections() {
		return collections;
	}

	public List<String> getCompletedTasks() {
		return completedTasks;
	}

	public List<Battle> getBattles() {
		return battles;
	}

	public int getPistachios() {
		return pistachios;
	}

	public List<String> getConfirmedFriends() {
		return confirmedFriends;
	}

	public List<String> getFriendRequests() {
		return friendRequests;
	}

	public String getBattleID() {
		return battleID;
	}

	public List<String> getTeam() {
		return this.team;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public void setConfirmedFriends(List<String> confirmedFriends) {
		this.confirmedFriends = confirmedFriends;
	}

	public void setFriendRequests(List<String> friendRequests) {
		this.friendRequests = friendRequests;
	}

	public void setStatus(PlayerStatus status) {
		this.status = status;
	}

	public void setCollections(List<String> collections) {
		this.collections = collections;
	}

	public void setCompletedTasks(List<String> completedTasks) {
		this.completedTasks = completedTasks;
	}

	public void setBattles(List<Battle> battles) {
		this.battles = battles;
	}

	public void setPistachios(int pistachios) {
		this.pistachios = pistachios;
	}

	public void setBattleID(String battle) {
		this.battleID = battle;
	}

	public void setBattle(Battle b) {
		this.battleID = b.getId();
	}

	public void setTeam(List<String> team) {
		this.team = team;
	}

	// -[Constructors]--------------------------------------------------------------------------------------------------------

	public Player() {
		this.user = "";
		this.pass = "";
	}

	/**
	 * Creates a player with default values on everything
	 * 
	 * @param User
	 */
	public Player(String user) {
		this.user = user;
		this.pass = "";
		// this._ID = "";
	}

	/**
	 * Creates a player with pass for authentication. <b>THIS USER MUST ONLY BE USED
	 * FOR AUTHENTICATION</b>
	 * 
	 * @param User
	 * @param Pass
	 */
	public Player(String user, String pass) {
		this.user = user;
		this.pass = pass;
		// this._ID = "";
	}

	// -[Methods]--------------------------------------------------------------------------------------------------------

	/**
	 * Check if the player is in a battle
	 * 
	 * @return battleID!=""
	 */
	public boolean inBattle() {
		return battleID != "";
	}

	/**
	 * Clears the battleID. Essentially, makes this player no longer in battle.
	 */
	public void clearBattle() {
		battleID = "";
	}

	/**
	 * Checks that the provided pass is the same as this user's pass
	 * 
	 * @param pass Pass to check
	 * @return True if and only if the pass matches the one held in this player
	 */
	public boolean checkPass(String pass) {
		if (this.pass == "") {
			throw new IllegalStateException("This user isn't meant for authentication purposes");
		}
		return pass.contentEquals(this.pass);
	}

	/**
	 * Clears the pass of this user in memory. <b>MUST BE USED BEFORE SENDING PLAYER
	 * THROUGH NETWORK</b>
	 */
	public void clearPass() {pass = "";}

	/**
	 * Adds given player P to the pending friends list of this player. Player P
	 * <b>must not</b> already be a friend OR have sent a request.
	 * 
	 * @param p Player who is requesting friendship
	 */
	public void requestFriendship(Player p) {
		if (confirmedFriends.contains(p.getUser())) {
			throw new IllegalArgumentException("Player " + p.getUser() + " is already friends with this player!");
		}
		if (friendRequests.contains(p.getUser())) {
			throw new IllegalArgumentException("Player " + p.getUser() + " has already requested frienship.");
		}
		friendRequests.add(p.getUser());
	}

	/**
	 * Adds a player object to the list of players in the user's friends list
	 * @param p
	 */

	public void addFriend(Player p) {this.confirmedFriends.add(p.getUser());}

	/**
	 * Accepts friendship request from the given player P (Who <b>must</b> be in the
	 * pending friends list). Adds this player to Player P's confirmed friends list
	 * 
	 * @param p
	 * @return RespondToFriendshipRequest(p,false) 
	*/
	public boolean acceptFriendship(Player p) {return respondToFriendshipRequest(p, false);}
	
	/**
	 * Rejects friendship request from the given player P (Who <b>must</b> be in the
	 * pending friends list).
	 * @param p
	 * @return RespondToFriendshipRequest(p,true)
	 */
	public boolean rejectFriendship(Player p) {return respondToFriendshipRequest(p, true);}
	
	
	/**
	 * Responds to a friendship request from the given player P (Who <b>must</b> be in the
	 * pending friends list). Adds this player to Player P's confirmed friends list
	 * 
	 * @return True if the specified command was able to be done.
	 * 
	 * @param p
	 * @param reject Whether or not to reject the friendship request
	 */
	public boolean respondToFriendshipRequest(Player p, boolean reject) {
		if (!friendRequests.contains(p.getUser())) {return false;}
		else if (friendRequests.contains(p.getUser()) && !reject) {
			if (p.friendRequests.contains(this.getUser())) {
				p.friendRequests.remove(this.getUser());
			}
			this.confirmedFriends.add(p.getUser());
			this.friendRequests.remove(p.getUser());
			return true;
		}

		else if (friendRequests.contains(p.getUser()) && reject) {
			this.friendRequests.remove(p.getUser());
			return false;
		} else {return false;}
	}


	/**
	 * Removes player P from this player's friend list. Player P <b>must</b> be in
	 * the confirmed friends list.
	 * 
	 * @param p
	 */
	public void removeFriend(Player p) {
		if (!confirmedFriends.contains(p.getUser())) {
			throw new IllegalArgumentException("Player " + p.getUser() + " is not friends with this player");
		}
		confirmedFriends.remove(p.getUser());
		p.confirmedFriends.remove(this.getUser());
	}

	/**
	 * Adds the specified amount P to the pistachios this player has (can be
	 * negative to charge pistacios)
	 * 
	 * @param p
	 */
	public void addPistachio(int p) {
		this.pistachios += p;
	}

	/***
	 * Adds monster M to the default collection of this player
	 * 
	 * @param m
	 */
	public void addMonster(Monster m) {
		// TODO: actually code this.
	}

	/**
	 * Marks provided task t as complete.
	 * 
	 * @param t
	 */
	public void markTaskComplete(Task t) {
		if (completedTasks.contains(t.get_ID())) {
			throw new IllegalArgumentException("Player has already completed task " + t.getName());
		}
		completedTasks.add(t.get_ID());
	}

	/**
	 * Checks if task T is in the list of completed tasks.
	 * 
	 * @param t
	 */
	public boolean hasTaskCompleted(Task t) {
		return completedTasks.contains(t.get_ID());
	}

	/**
	 * Clears completed tasks. Should be done once new tasks are available.
	 */
	public void clearCompletedTasks() {
		completedTasks.clear();
	}

	/**
	 * Adds given battle B to the list of battles this player is in
	 * 
	 * @param b
	 */
	public void addBattle(Battle b) {
		battles.add(b);
	}

	/**
	 * Removes given battle B from the list of battles this player is in
	 * 
	 * @param b
	 */
	public void removeBattle(Battle b) {
		battles.remove(b);
	}

	/**
	 * Compares this player with another object. Returns true if and only if the
	 * other object is a player, and their user is the same as this one's
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Player)) {
			return false;
		}
		Player other = (Player) obj;
		return user.contentEquals(other.user);
	}

	/**

	 * Returns the player's user. For debugging purposes.
	 */
	@Override
	public String toString() {
		return "Player [User=" + user + "]";
	}

}
