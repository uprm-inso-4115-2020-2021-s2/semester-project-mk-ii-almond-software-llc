package com.pistachio.restservice.main;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LootBoxRepository extends MongoRepository<LootBox, String>{}