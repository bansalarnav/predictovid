import styles from './symptoms.scss'

const Symptoms = () => {
    return <div className={styles.symptoms}>
        <div>
            <img src="/cough.png" />
            <h4>Cough</h4>
        </div>
        <div>
            <img src="/fever.png" />
            <h4>Fever</h4>
        </div>
        <div>
            <img src="/breath.png" />
            <h4>Breath Shortage</h4>
        </div>
        <div>
            <img src="/chestpain.png" />
            <h4>Chest Pain</h4>
        </div>
        <div>
            <img src="/headache.png" />
            <h4>Headache</h4>
        </div>
        <div>
            <img src="/tireness.png" />
            <h4>Tiredness</h4>
        </div>
        <div>
            <img src="/pain.png" />
            <h4>Body Pain</h4>
        </div>
    </div>
}

export default Symptoms