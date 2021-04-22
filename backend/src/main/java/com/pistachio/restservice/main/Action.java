package com.pistachio.restservice.main;

import java.util.Objects;

public class Action {

    private String username;
    private Boolean server;
    private String content;
    private int type;


    //Constructors
    public Action(){}

    public Action(String username, Boolean server, String content)
    {
        this.username = username;
        this.server = server;
        this.content = content;
    }

    //Getters and setters
    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}
    public Boolean getServer() {return server;}
    public void setServer(Boolean server) {this.server = server;}
    public String getContent() {return content;}
    public void setContent(String content) {this.content = content;}
    public int getType() {return type;}
    public void setType(int type) {this.type = type;}

    
    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Action that = (Action) o;
        return Objects.equals(username, that.getUsername()) &&
                Objects.equals(content, that.getContent());

    }

    @Override
    public int hashCode()
    {
        return Objects.hash(username, content);
    }
    
}
