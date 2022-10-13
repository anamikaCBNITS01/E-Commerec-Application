import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from './style.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
const footer = () => {
  return (
    <>
      <footer>
        <div>
          <div className={styles.footer}>
            <div className={styles.flexBox}>
              <div>
                <h3>About</h3>
                <p>Details</p>
                <p>Aim</p>
                <p>History</p>
              </div>
              <div>
                <h3>Help</h3>
                <p>Payment</p>
                <p>Shipping</p>
                <p>FAQ</p>
                <p>Cancellation & Return</p>
              </div>
              <div>
                <h3>Contact Us</h3>
                <p>Bhopal</p>
                <p>Indore</p>
                <p>Mumbai</p>
              </div>
              <div>
                <h3>Social</h3>
                <div className={styles.iconsName}>
                  <div>
                    Facebook
                  </div>
                  <div>
                    <FacebookIcon />
                  </div>
                </div>
                <div className={styles.iconsName}>
                  <div>
                    Gmail
                  </div>
                  <div>
                    <AttachEmailIcon/>
                  </div>
                </div>
                <div className={styles.iconsName}>
                  <div>
                    Instagram
                  </div>
                  <div>
                    <InstagramIcon/>
                  </div>
                </div>
                <div className={styles.iconsName}>
                  <div>
                    Twitter
                  </div>
                  <div>
                    <TwitterIcon/>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.copyright}>
              <h4>@2022 copyright Shpping Mart</h4>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;
