class Component extends BaseComponent {
    constructor(context, width, height) {
        super();
        //get plc data. 'widget.Data' is  taken from plc_data_block.json.
        // this.dataValuePath = config.get('widget.Data', null);
        

        this.images = ["safeWorkingLoadChart.png", "ternarycontour.png", "genie-load-chart.jpg", "jlg-load-chart.jpg"]
        // this.switchButton = document.getElementById('clickme');
        this.image = document.getElementById('image');
        this.cross = document.getElementById('cross');
        this.crossWrap = document.getElementById('crossWrap');
        this.bar = document.getElementById('bar');
        this.barContainer = document.getElementById('barContainer');
        this.marks = document.getElementById('marks');

        // this.xSlider = document.getElementById('xSlider');
        // this.ySlider = document.getElementById('ySlider');
        // this.barSlider = document.getElementById('barSlider');
        // this.loadSlider = document.getElementById('maxLoad');
        this.x = 0;
        this.y = 50;
        this.barValue = 0; // Initial bar fill value
        this.limitLoad = 0;
        this.imageIndex = 0;
        // this.switchButton.addEventListener("click", () => {
            // var img = document.getElementById("image");
            // this.imageIndex = (this.imageIndex + 1) % this.images.length;
            // img.src=this.images[this.imageIndex];
        // });

        // this.xSlider.addEventListener('input', () => {
        //     this.x = this.xSlider.value / 100 * this.image.width;
        //     this.updateCross();
        // });

        
        // this.ySlider.addEventListener('input', () => {
        //     this.y = (1 - this.ySlider.value / 100) * this.image.width;
        //     this.updateCross();
        // });

        // this.loadSlider.addEventListener('input', () => {
        //     this.limitLoad = 100 - this.loadSlider.value;
        //     // this.barValue = this.barSlider.value * this.loadSlider.value/100; //
        //     this.updateLimitLoad();
        //     // this.updateBar(); //
        // });

        // this.barSlider.addEventListener('input', () => {
        //     // this.barValue = this.barSlider.value * this.loadSlider.value/100;
        //     this.barValue = this.barSlider.value;
        //     this.updateBar();
        // });


        this.image.onload = () => {
            this.updateCross(); // Draw initial state
            this.updateBar(); // Draw initial state
            this.updateLimitLoad();
        };

        // demo
        this.increasing = true;
        this.demo();
        this.setupInterval();
        this.it = 0;


    };


    updateCross() {
        // Update the position of the cross
        let crossX = this.x; // Adjust for half the cross size
        let crossY = this.y; // Adjust for half the cross size
        this.crossWrap.style.left = `${crossX}px`;
        this.crossWrap.style.top = `${crossY}px`;
        this.cross.style.left = `${crossX}px`;
        this.cross.style.top = `${crossY}px`;
    }

    updateLimitLoad(){
        const triangle = document.getElementById('triangle');
        // triangle.style.left = '100px'
        triangle.style.top = `${this.limitLoad}%`;
    }

    updateBar() {
        // Padding from the top and bottom in pixels
        const paddingTop = 0;
        const paddingBottom = 0;

        // Set the container's dimensions to match the available height
        const availableHeight = this.image.height - paddingTop - paddingBottom;
        this.barContainer.style.height = `${availableHeight}px`;
        this.barContainer.style.top = `${paddingTop}px`;

        // Calculate the height of the bar based on the slider value
        const barHeight = this.barValue / 100 * availableHeight;
        this.bar.style.height = `${barHeight}px`;

        if(this.barValue / (100 - this.limitLoad) >= 0.9)
            {this.bar.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--barRed');}
        else if(this.barValue / (100 - this.limitLoad) > 0.75)
            {this.bar.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--barYellow');}
        else {this.bar.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--barGreen');}
        // Clear existing marks
        this.marks.innerHTML = '';
        
        // Add marks at every 10% interval
        for (let i = 0; i <= 100; i++) {
            this.addMark(i);
        }
    }

    addMark(percentage) {
        const mark = document.createElement('div');
        mark.className = 'mark';
        const containerHeight = this.barContainer.clientHeight;
        const markPosition = (percentage / 100) * containerHeight;
        mark.style.bottom = `${markPosition}px`;
        if (percentage % 10 == 0){
            if(percentage == 0 || percentage == 100){ // don't draw mark for min and max value
                mark.style.width = '0px';
                mark.style.height = '0px';
            } else{
                mark.style.width = '15px';            // make thicker if multiple of 10
                mark.style.height = '2px';
            }
            // const text = document.createElement('span');
            // text.innerText = percentage/* + '%'*/; // Display percentage value as text
            // text.style.position = 'relative'; // Set position to relative for text positioning
            // text.style.color = 'limegreen';
            // text.style.left = '30px'; // Adjust left offset for text
            // text.style.bottom = '10px'; // Adjust up offset for text
            const label = document.createElement('div');
            label.className = 'label';
            label.textContent = percentage/* + '%'*/;
            label.style.bottom = markPosition + '%';

            // marksContainer.appendChild(mark);
            // marksContainer.appendChild(label);
            mark.appendChild(label); // Append text to mark element
            
        } 
        this.marks.appendChild(mark);
    }

    update(value, data) {
        // Update function logic
    }

    render() {
        // Render function logic
    }


    demo() 
    {
        let step = 0.1;
        if (this.increasing) 
        {
            this.it+= step;
            this.imageIndex +=step;

            if(this.limitLoad % 100 == 0){
                var img = document.getElementById("image");
                this.imageIndex = (this.imageIndex) % this.images.length;
                img.src=this.images[Math.round(this.imageIndex)];
            }

            if (this.it>= 100) 
            {
                this.increasing = false;
            }
        } else 
        {
            // this.x -= 5;
            // this.y -= 5;
            this.it-= step;

            if (this.it<= 0) 
                {
                    this.increasing = true;
                }
            }

        this.limitLoad = - this.it* 10/100 + 48;
        this.barValue = - this.it* 10/100 + 50;
        this.x = 300 + 50 * Math.cos(this.it/10);
        this.y = 300 + 50 * Math.sin(this.it/10);
        this.updateCross();
        this.updateBar();
        this.updateLimitLoad();
    }

    setupInterval()
    {
        setInterval(() => {this.demo();},100);
    }

}

registerComponent(Component, COMPONENT_TYPES.DATA_ONLY);