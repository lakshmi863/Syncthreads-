export const getDashboardData = (req, res) => {
    res.json({ cards: [{ id: 1, name: "Card 1" }, { id: 2, name: "Card 2" }] });
};
