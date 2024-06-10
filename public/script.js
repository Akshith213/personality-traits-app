


document.addEventListener("DOMContentLoaded", function() {
    const big5Traits = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];
    const mbtiTraits = ["Extraversion", "Sensing", "Thinking", "Judgment", "Introversion", "Intuition", "Feeling", "Perception"];
    let currentTraits = big5Traits;
    const traitSelector = document.getElementById("traitSelector");
    const resetButton = document.getElementById("resetButton");
    const toggleButton = document.getElementById("togglePersonalityPanel");
    const personalityPanel = document.querySelector(".personality-list");
    const kSelector = document.getElementById("kValue");
    const applyKNNButton = document.getElementById("applyKNN");
    const levelsBig5 = [0.2, 0.5, 0.8];  // Levels for Big 5
    const levelsMBTI = [0, 1];  // Levels for MBTI (binary presence or absence)

    let personalityData = [
        // Your Big 5 personality data here...
        {"name": "Disciplined Traditionalist", "values": [0.8, 0.5, 0.8, 0.5, 0.2]},
        {"name": "Pragmatic Innovator", "values": [0.5, 0.2, 0.8, 0.2, 0.8]},
        {"name": "Sensitive Realist", "values": [0.5, 0.5, 0.2, 0.8, 0.2]},
        {"name": "Casual Dreamer", "values": [0.5, 0.5, 0.2, 0.2, 0.8]},
        {"name": "Reserved Perfectionist", "values": [0.2, 0.2, 0.8, 0.2, 0.8]},
        {"name": "Expressive Rebel", "values": [0.8, 0.2, 0.2, 0.8, 0.8]},
        {"name": "Stoic Pessimist", "values": [0.2, 0.2, 0.2, 0.8, 0.2]},
        {"name": "Bold Explorer", "values": [0.8, 0.2, 0.2, 0.5, 0.8]},
        {"name": "Quiet Observer", "values": [0.2, 0.5, 0.2, 0.5, 0.2]},
        {"name": "Dynamic Enthusiast", "values": [0.8, 0.2, 0.5, 0.8, 0.8]},
        {"name": "Sociable Traditionalist", "values": [0.8, 0.5, 0.5, 0.5, 0.2]},
        {"name": "Cautious Critic", "values": [0.2, 0.2, 0.5, 0.8, 0.2]},
        {"name": "Adventurous Idealist", "values": [0.8, 0.5, 0.2, 0.8, 0.8]},
        {"name": "Reserved Visionary", "values": [0.2, 0.2, 0.2, 0.8, 0.8]},
        {"name": "Charismatic Diplomat", "values": [0.8, 0.5, 0.8, 0.5, 0.8]},
        {"name": "Gentle Guardian", "values": [0.2, 0.8, 0.2, 0.8, 0.2]},
        {"name": "Assertive Pioneer", "values": [0.8, 0.2, 0.8, 0.8, 0.8]},
        {"name": "Introspective Strategist", "values": [0.2, 0.2, 0.8, 0.8, 0.8]},
        {"name": "Balanced Harmonizer", "values": [0.5, 0.8, 0.8, 0.5, 0.5]},
        {"name": "Confident Organizer", "values": [0.8, 0.5, 0.5, 0.5, 0.2]},
        {"name": "Commanding Leader", "values": [0.8, 0.8, 0.8, 0.2, 0.2]},
        {"name": "Contemplative Artist", "values": [0.2, 0.8, 0.2, 0.2, 0.8]},
        {"name": "Analytical Skeptic", "values": [0.2, 0.2, 0.5, 0.8, 0.5]},
        {"name": "Visionary Leader", "values": [0.8, 0.8, 0.8, 0.5, 0.8]},
        {"name": "Compassionate Stabilizer", "values": [0.5, 0.8, 0.8, 0.8, 0.5]},
        {"name": "Energetic Innovator", "values": [0.8, 0.5, 0.8, 0.2, 0.8]},
        {"name": "Thoughtful Philosopher", "values": [0.2, 0.8, 0.5, 0.8, 0.5]},
        {"name": "Driven Achiever", "values": [0.8, 0.8, 0.8, 0.5, 0.2]},
        {"name": "Empathetic Protector", "values": [0.2, 0.8, 0.8, 0.8, 0.2]},
        {"name": "Unconventional Theorist", "values": [0.5, 0.2, 0.2, 0.8, 0.8]},
        {"name": "Kindhearted Pragmatist", "values": [0.2, 0.8, 0.5, 0.8, 0.2]},
        {"name": "Warm Idealist", "values": [0.5, 0.8, 0.2, 0.8, 0.8]},
        {"name": "Influential Motivator", "values": [0.8, 0.8, 0.8, 0.5, 0.8]},
        {"name": "Reflective Mediator", "values": [0.2, 0.8, 0.5, 0.5, 0.8]},
        {"name": "Reserved Innovator", "values": [0.2, 0.5, 0.8, 0.5, 0.8]},
        {"name": "Enthusiastic Creator", "values": [0.8, 0.5, 0.8, 0.5, 0.8]},
        {"name": "Methodical Thinker", "values": [0.2, 0.5, 0.8, 0.2, 0.8]},
        {"name": "Devoted Scholar", "values": [0.2, 0.8, 0.8, 0.2, 0.8]},
        {"name": "Cooperative Realist", "values": [0.5, 0.8, 0.5, 0.5, 0.2]},
        {"name": "Charismatic Optimist", "values": [0.8, 0.8, 0.8, 0.2, 0.8]},
        {"name": "Reflective Dreamer", "values": [0.2, 0.5, 0.5, 0.8, 0.8]},
        {"name": "Empathetic Visionary", "values": [0.5, 0.8, 0.8, 0.5, 0.8]},
        {"name": "Dedicated Innovator", "values": [0.2, 0.8, 0.8, 0.5, 0.8]}
        // Add more personalities as needed...
    ];

    let mbtiPersonalityData = [
        // Your MBTI personality data here...
        {"name": "The Inspector (ISTJ)", "values": [0, 1, 0, 0, 1, 0, 0, 0]},
        {"name": "The Counselor (INFJ)", "values": [0, 0, 0, 0, 1, 1, 1, 0]},
        {"name": "The Mastermind (INTJ)", "values": [0, 0, 1, 0, 1, 1, 0, 0]},
        {"name": "The Giver (ENFJ)", "values": [1, 0, 0, 0, 0, 1, 1, 0]},
        {"name": "The Craftsman (ISTP)", "values": [0, 1, 0, 0, 1, 0, 0, 1]},
        {"name": "The Provider (ESFJ)", "values": [1, 0, 0, 0, 0, 0, 1, 0]},
        {"name": "The Idealist (INFP)", "values": [0, 0, 0, 0, 1, 1, 1, 1]},
        {"name": "The Performer (ESFP)", "values": [1, 0, 0, 0, 0, 0, 1, 1]},
        {"name": "The Champion (ENFP)", "values": [1, 0, 0, 0, 0, 1, 1, 1]},
        {"name": "The Doer (ESTP)", "values": [1, 1, 0, 0, 0, 0, 0, 1]},
        {"name": "The Supervisor (ESTJ)", "values": [1, 1, 0, 0, 0, 0, 0, 0]},
        {"name": "The Commander (ENTJ)", "values": [1, 0, 1, 0, 0, 0, 0, 0]},
        {"name": "The Thinker (INTP)", "values": [0, 0, 1, 0, 1, 1, 0, 1]},
        {"name": "The Nurturer (ISFJ)", "values": [0, 0, 0, 0, 1, 0, 1, 0]},
        {"name": "The Visionary (ENTP)", "values": [1, 0, 1, 0, 0, 1, 0, 1]},
        {"name": "The Composer (ISFP)", "values": [0, 0, 0, 0, 1, 0, 1, 1]}
        // Add more personalities as needed...
    ];

    const words = {
        "Openness": {
            "Low": ["Conventional", "Down-to-earth", "Uncreative", "Narrow-minded", "Routine"],
            "Average": ["Moderate", "Balanced", "Accepting", "Fair-minded", "Realistic"],
            "High": ["Imaginative", "Creative", "Curious", "Inventive", "Open-minded"]
        },
        "Conscientiousness": {
            "Low": ["Careless", "Impulsive", "Disorganized", "Negligent", "Irresponsible"],
            "Average": ["Reliable", "Organized", "Dependable", "Practical", "Consistent"],
            "High": ["Thorough", "Meticulous", "Diligent", "Disciplined", "Perfectionistic"]
        },
        "Extraversion": {
            "Low": ["Reserved", "Quiet", "Introverted", "Withdrawn", "Shy"],
            "Average": ["Sociable", "Approachable", "Friendly", "Interactive", "Talkative"],
            "High": ["Outgoing", "Energetic", "Enthusiastic", "Assertive", "Gregarious"]
        },
        "Agreeableness": {
            "Low": ["Critical", "Skeptical", "Aloof", "Self-interested", "Uncooperative"],
            "Average": ["Considerate", "Pleasant", "Tolerant", "Reasonable", "Fair"],
            "High": ["Compassionate", "Trusting", "Altruistic", "Empathetic", "Cooperative"]
        },
        "Neuroticism": {
            "Low": ["Calm", "Stable", "Relaxed", "Unemotional", "Self-assured"],
            "Average": ["Balanced", "Even-tempered", "Moderate", "Content", "Realistic"],
            "High": ["Anxious", "Moody", "Sensitive", "Nervous", "Self-conscious"]
        }
    };

    const selectedWords = {}; // Object to store selected words

    function loadPersonalities() {
        const personalityList = d3.select("#personalityNames");
        personalityList.selectAll("*").remove();
        const dataToUse = traitSelector.value === "big5" ? personalityData : mbtiPersonalityData;
        dataToUse.forEach(personality => {
            personalityList.append("li")
                .text(personality.name)
                .on("click", () => {
                    initializeRadarChart(currentTraits, personality.values);
                });
        });
    }

    function drawConcentricCircles(svg, rScale, levels) {
        const circleAxes = svg.selectAll(".circle-axis")
            .data(levels)
            .enter()
            .append("g")
            .attr("class", "circle-axis");
        circleAxes.append("circle")
            .attr("r", level => rScale(level))
            .style("fill", "none")
            .style("stroke", "grey")
            .style("stroke-dasharray", "2 2")
            .style("stroke-opacity", 0.7);
    }

    function initializeRadarChart(traits, values = traits.map(() => 0.5)) {
        const levels = traitSelector.value === "big5" ? levelsBig5 : levelsMBTI;
        const numTraits = traits.length;
        const width = 600, height = 600;
        const margin = 80, radius = Math.min(width, height) / 2 - margin;
        const angleSlice = Math.PI * 2 / numTraits;
        const rScale = d3.scaleLinear().range([0, radius]).domain([0, 1]);
        const pointsData = traits.map((trait, i) => ({
            trait: trait,
            value: values[i],
            angle: angleSlice * i
        }));

        d3.select("#radarChart").select("svg").remove();
        const svg = d3.select("#radarChart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        drawConcentricCircles(svg, rScale, levels);
        const axes = svg.selectAll(".axis")
            .data(pointsData)
            .enter()
            .append("g")
            .attr("class", "axis");

        axes.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", d => rScale(1) * Math.cos(d.angle - Math.PI / 2))
            .attr("y2", d => rScale(1) * Math.sin(d.angle - Math.PI / 2))
            .style("stroke", "grey");

        axes.append("text")
            .attr("x", d => rScale(1.2) * Math.cos(d.angle - Math.PI / 2))
            .attr("y", d => rScale(1.2) * Math.sin(d.angle - Math.PI / 2))
            .text(d => d.trait)
            .style("text-anchor", "middle");

        const radarArea = svg.append("path")
            .datum(pointsData)
            .attr("d", d3.lineRadial()
                .angle(d => d.angle)
                .radius(d => rScale(d.value))
                .curve(d3.curveLinearClosed))
            .style("fill", "lightblue")
            .style("fill-opacity", 0.6);

        const drag = d3.drag()
            .on("drag", function(event, d) {
                const distance = Math.sqrt(Math.pow(event.x, 2) + Math.pow(event.y, 2));
                const newValue = rScale.invert(distance);
                d.value = levels.reduce((prev, curr) => (Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev));
                selectedSpoke = d.trait; // Set the selected spoke
                updateRadarChart(pointsData, svg, rScale, d);
            })
            .on("start", function(event, d) {
                d3.select(this).raise().attr("r", 6).style("fill", "orange");
            })
            .on("end", function(event, d) {
                selectedSpoke = null; // Reset selected spoke
                updateRadarChart(pointsData, svg, rScale, d);
                d3.select(this).attr("r", 4).style("fill", "navy");
            });

        svg.selectAll(".radar-point")
            .data(pointsData)
            .enter()
            .append("circle")
            .attr("class", "radar-point")
            .attr("r", 4)
            .attr("cx", d => rScale(d.value) * Math.cos(d.angle - Math.PI / 2))
            .attr("cy", d => rScale(d.value) * Math.sin(d.angle - Math.PI / 2))
            .style("fill", "navy")
            .call(drag);

        function updateRadarChart(pointsData, svg, rScale, draggedPoint) {
            radarArea.datum(pointsData).attr("d", d3.lineRadial()
                .angle(d => d.angle)
                .radius(d => rScale(d.value))
                .curve(d3.curveLinearClosed));

            svg.selectAll(".radar-point")
                .data(pointsData)
                .attr("cx", d => rScale(d.value) * Math.cos(d.angle - Math.PI / 2))
                .attr("cy", d => rScale(d.value) * Math.sin(d.angle - Math.PI / 2))
                .style("fill", d => d.trait === selectedSpoke ? "orange" : "navy")
                .attr("r", d => d.trait === selectedSpoke ? 6 : 4); // Update radius for selected spoke

            // Update word cloud
            updateWordCloud(draggedPoint.trait, draggedPoint.value);
        }
    }

    function updateWordCloud(trait, value) {
        const level = value === 0.2 ? "Low" : value === 0.5 ? "Average" : value === 0.8 ? "High" : null;
        const wordsToShow = words[trait][level];
        
        const wordCloud = d3.select("#wordCloud");
        wordCloud.selectAll("*").remove(); // Clear previous words

        wordCloud.selectAll("div")
            .data(wordsToShow)
            .enter()
            .append("div")
            .attr("class", "word")
            .style("padding", "5px")
            .style("margin", "5px")
            .style("background-color", "lightgrey")
            .style("border-radius", "5px")
            .style("cursor", "pointer")
            .text(d => d)
            .on("click", function(event, d) {
                const isSelected = d3.select(this).classed("selected");
                d3.select(this).classed("selected", !isSelected)
                    .style("background-color", isSelected ? "lightgrey" : "orange");
                if (isSelected) {
                    removeSelectedWord(trait, level, d);
                } else {
                    retainSelectedWord(trait, level, d);
                }
            });
    }

    function retainSelectedWord(trait, level, word) {
        if (!selectedWords[trait]) {
            selectedWords[trait] = {};
        }
        if (!selectedWords[trait][level]) {
            selectedWords[trait][level] = [];
        }
        selectedWords[trait][level].push(word); // Retain the selected word

        updateSelectedWordsBox();
    }

    function removeSelectedWord(trait, level, word) {
        const index = selectedWords[trait][level].indexOf(word);
        if (index > -1) {
            selectedWords[trait][level].splice(index, 1); // Remove the selected word
        }

        updateSelectedWordsBox();
    }

    function updateSelectedWordsBox() {
        const selectedWordsList = d3.select("#selectedWordsList");
        selectedWordsList.selectAll("*").remove(); // Clear previous list

        Object.keys(selectedWords).forEach(trait => {
            Object.keys(selectedWords[trait]).forEach(level => {
                selectedWords[trait][level].forEach(word => {
                    selectedWordsList.append("li")
                        .text(`${trait} (${level}): ${word}`);
                });
            });
        });
    }

    function calculateDistance(values1, values2) {
        return Math.sqrt(values1.reduce((sum, value, index) => sum + Math.pow(value - values2[index], 2), 0));
    }

    function applyKNN(currentValues) {
        const dataToUse = traitSelector.value === "big5" ? personalityData : mbtiPersonalityData;
        const distances = dataToUse.map(personality => ({
            name: personality.name,
            distance: calculateDistance(personality.values, currentValues)
        }));

        distances.sort((a, b) => a.distance - b.distance);
        const k = parseInt(kSelector.value, 10);
        highlightTopKPersonalities(distances.slice(0, k));
    }

    function highlightTopKPersonalities(topKPersonalities) {
        const names = topKPersonalities.map(p => p.name);
        d3.selectAll("#personalityNames li")
            .style("font-weight", function() {
                return names.includes(this.textContent) ? "bold" : "normal";
            })
            .style("background-color", function() {
                return names.includes(this.textContent) ? "lightgrey" : "transparent";
            });
    }

    traitSelector.addEventListener('change', function() {
        currentTraits = this.value === "big5" ? big5Traits : mbtiTraits;
        initializeRadarChart(currentTraits);
        loadPersonalities();
    });

    resetButton.addEventListener('click', function() {
        selectedSpoke = null; // Reset selected spoke
        initializeRadarChart(currentTraits);
        d3.selectAll("#personalityNames li")
            .style("font-weight", "normal")
            .style("background-color", "transparent");

        // Clear selected words
        for (let trait in selectedWords) {
            delete selectedWords[trait];
        }
        updateSelectedWordsBox();

        // Clear word cloud
        d3.select("#wordCloud").selectAll("*").remove();
    });

    toggleButton.addEventListener('click', function() {
        personalityPanel.classList.toggle('show-panel');
        toggleButton.textContent = personalityPanel.classList.contains('show-panel') ? 'Hide Personalities' : 'Show Personalities';
    });

    applyKNNButton.addEventListener('click', function() {
        const currentValues = d3.selectAll(".radar-point").data().map(d => d.value);
        applyKNN(currentValues);
    });

    loadPersonalities();
    initializeRadarChart(currentTraits);
});
