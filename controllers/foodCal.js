const express = require('express');
const { Client } = require('pg');
const client = require('../models/database.js');


const foodCalucation = async (req, res) => {
    try {
        const { zone, organization_id, total_distance, item_type } = req.body;

        const parsedDistance = parseFloat(total_distance);
        const parsedOrganisation_id = parseInt(organization_id);

        if (!zone || !organization_id || total_distance === undefined || !item_type) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (typeof parsedDistance !== 'number' || parsedDistance <= 0 || parsedDistance > 30) {
            return res.status(400).json({ message: "Total distance must be a number between 1 and 30 km and should be number type" });
        }

        if (item_type.toLowerCase() !== "perishable" && item_type.toLowerCase() !== "non-perishable") {
            return res.status(400).json({ message: "Item type must be 'perishable' or 'non-perishable'." });
        }

        if (typeof parsedOrganisation_id !== 'number' || Number.isNaN(parsedOrganisation_id) || !Number.isInteger(parsedOrganisation_id)) {
            return res.status(400).json({ message: "Organization ID should be an integer." });
        }

        if (typeof zone !== 'string' || !zone.trim()) {
            return res.status(400).json({ message: "Zone must be a non-empty string." });
        }

        if (typeof item_type !== 'string' || !item_type.trim()) {
            return res.status(400).json({ message: "Item type must be a non-empty string." });
        }

        // Execute the query to fetch the items from the database
        const queryResult = await client.query(
            `SELECT p.km_price, p.fix_price
            FROM Pricing p
            JOIN Organization o ON p.organization_id = o.id
            JOIN Item i ON p.item_id = i.id
            WHERE p.organization_id = $1 AND Lower(i.type) = Lower($2) AND Lower(p.zone) = Lower($3)`,
            [parsedOrganisation_id, item_type.trim(), zone.trim()]
        );

        let total_price;

        // Check if query result is empty
        if (queryResult.rows.length === 0) {
            return res.status(404).json({ message: "No items found matching the specified criteria." });
        } else {
            const { km_price, fix_price } = queryResult.rows[0];
            if (parsedDistance <= 5) {
                total_price = parseFloat(fix_price).toFixed(2);
            } else {
                total_price = ((parsedDistance - 5) * parseFloat(km_price) + parseFloat(fix_price)).toFixed(2);
            }
            return res.status(200).json({ 'total_price': parseFloat(total_price) });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = foodCalucation;
