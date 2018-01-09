package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MondrianDs.
 */
@Entity
@Table(name = "mondrian_ds")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MondrianDs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "nm_cubo", length = 100)
    private String nmCubo;

    @Size(max = 400)
    @Column(name = "dl_nome_saiku", length = 400)
    private String dlNomeSaiku;

    @Size(max = 400)
    @Column(name = "dl_path_schema", length = 400)
    private String dlPathSchema;

    @Size(max = 1024)
    @Column(name = "de_mondrian_conn", length = 1024)
    private String deMondrianConn;

    @Size(max = 400)
    @Column(name = "dl_jdbc_url", length = 400)
    private String dlJdbcUrl;

    @Size(max = 400)
    @Column(name = "dl_driver", length = 400)
    private String dlDriver;

    @Size(max = 400)
    @Column(name = "dl_username", length = 400)
    private String dlUsername;

    @Size(max = 400)
    @Column(name = "dl_password", length = 400)
    private String dlPassword;

    @OneToOne
    @JoinColumn(unique = true)
    private Datasource datasource;

    @ManyToOne
    private Ind01Indic indicator;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNmCubo() {
        return nmCubo;
    }

    public MondrianDs nmCubo(String nmCubo) {
        this.nmCubo = nmCubo;
        return this;
    }

    public void setNmCubo(String nmCubo) {
        this.nmCubo = nmCubo;
    }

    public String getDlNomeSaiku() {
        return dlNomeSaiku;
    }

    public MondrianDs dlNomeSaiku(String dlNomeSaiku) {
        this.dlNomeSaiku = dlNomeSaiku;
        return this;
    }

    public void setDlNomeSaiku(String dlNomeSaiku) {
        this.dlNomeSaiku = dlNomeSaiku;
    }

    public String getDlPathSchema() {
        return dlPathSchema;
    }

    public MondrianDs dlPathSchema(String dlPathSchema) {
        this.dlPathSchema = dlPathSchema;
        return this;
    }

    public void setDlPathSchema(String dlPathSchema) {
        this.dlPathSchema = dlPathSchema;
    }

    public String getDeMondrianConn() {
        return deMondrianConn;
    }

    public MondrianDs deMondrianConn(String deMondrianConn) {
        this.deMondrianConn = deMondrianConn;
        return this;
    }

    public void setDeMondrianConn(String deMondrianConn) {
        this.deMondrianConn = deMondrianConn;
    }

    public String getDlJdbcUrl() {
        return dlJdbcUrl;
    }

    public MondrianDs dlJdbcUrl(String dlJdbcUrl) {
        this.dlJdbcUrl = dlJdbcUrl;
        return this;
    }

    public void setDlJdbcUrl(String dlJdbcUrl) {
        this.dlJdbcUrl = dlJdbcUrl;
    }

    public String getDlDriver() {
        return dlDriver;
    }

    public MondrianDs dlDriver(String dlDriver) {
        this.dlDriver = dlDriver;
        return this;
    }

    public void setDlDriver(String dlDriver) {
        this.dlDriver = dlDriver;
    }

    public String getDlUsername() {
        return dlUsername;
    }

    public MondrianDs dlUsername(String dlUsername) {
        this.dlUsername = dlUsername;
        return this;
    }

    public void setDlUsername(String dlUsername) {
        this.dlUsername = dlUsername;
    }

    public String getDlPassword() {
        return dlPassword;
    }

    public MondrianDs dlPassword(String dlPassword) {
        this.dlPassword = dlPassword;
        return this;
    }

    public void setDlPassword(String dlPassword) {
        this.dlPassword = dlPassword;
    }

    public Datasource getDatasource() {
        return datasource;
    }

    public MondrianDs datasource(Datasource datasource) {
        this.datasource = datasource;
        return this;
    }

    public void setDatasource(Datasource datasource) {
        this.datasource = datasource;
    }

    public Ind01Indic getIndicator() {
        return indicator;
    }

    public MondrianDs indicator(Ind01Indic ind01Indic) {
        this.indicator = ind01Indic;
        return this;
    }

    public void setIndicator(Ind01Indic ind01Indic) {
        this.indicator = ind01Indic;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MondrianDs mondrianDs = (MondrianDs) o;
        if (mondrianDs.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mondrianDs.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MondrianDs{" +
            "id=" + getId() +
            ", nmCubo='" + getNmCubo() + "'" +
            ", dlNomeSaiku='" + getDlNomeSaiku() + "'" +
            ", dlPathSchema='" + getDlPathSchema() + "'" +
            ", deMondrianConn='" + getDeMondrianConn() + "'" +
            ", dlJdbcUrl='" + getDlJdbcUrl() + "'" +
            ", dlDriver='" + getDlDriver() + "'" +
            ", dlUsername='" + getDlUsername() + "'" +
            ", dlPassword='" + getDlPassword() + "'" +
            "}";
    }
}
